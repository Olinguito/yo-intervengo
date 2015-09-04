import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {Category, Report, Picture, CitizenShort, reportType as t} from 'yi/shared/models';
import {MemoryBackend} from 'lib/backend/backend';
import Map from './map';
import {User} from 'lib/user';

const IMGUR_ID = 'Client-ID e84b4d7dc9700e0';
const IMGUR_URL = 'https://api.imgur.com/3/image';
const GEOCODE_URL = 'http://nominatim.openstreetmap.org/reverse?format=json&zoom=6';

// TODO use translations
var errorsMsg = {
    'title': 'Titulo invalido',
    'title.required': 'El título es obligatorio',
    'title.length': 'El título es muy corto',
    'description': 'Descripcción invalida',
    'description.required': 'La descripcción es obligatoria',
    'description.length': 'La descripción es muy corta',
    'location': 'Ubicación invalida'
}

@inject(Router, MemoryBackend, Map, HttpClient, User)
export class ReportNew {
    report = null;
    photoFile = null;
    // form errors
    errors = [];

    constructor(router, memory, map, http, user) {
        this.memory = memory;
        this.map = map;
        this.map.config.maxZoom = 20;
        this.router = router;
        this.http = http;
        this.user = user;
    }

    photoSelected(file) {
        this.photoUrl = URL.createObjectURL(file);
        this.photoFile = file;
        // set photo-button image
        this.photoArea.style.backgroundImage = `url(${this.photoUrl})`;
        // this.report.pictures[0].url = this.photoUrl;
    }

    saveReport() {
        var photoOk = Promise.resolve();
        if (!this.formValid()) {
            return;
        }
        // upload photo
        if (this.photoFile) {
            photoOk = uploadPhoto(this.photoFile, this.user.profile)
                .then(p => this.report.pictures.push(p))
                // delete on memory loaded image
                .then(URL.revokeObjectURL(this.photoUrl));
        }
        // save report
        photoOk.then(() => this.report.save())
            .then(()=> this.router.navigateBack())
            .catch(res => {
                if (res.content.errors) {
                    this.errors.length = 0;
                    this.errors.push.apply(this.errors,
                        Object.keys(res.content.errors).map(e => errorsMsg[e])
                    );
                }
            });
    }

    attached() {
        // scroll to newly added card in list
        this.router.container.viewModel //parent viewModel
            .list.yiCardList.highlight(this.report);
    }

    canActivate() {
        return this.user.isLoggedIn;
    }

    activate(params) {
        var {type, category} = params, newReport;
        newReport = new Report();
        newReport.type = type === 'request' ? t.request : t.complain;
        newReport.location = {lat: this.map.lat, lng: this.map.lng};
        // reverse geocode city with nominatim
        this.http
        .createRequest(`${GEOCODE_URL}&lat=${newReport.location.lat}&lon=${newReport.location.lng}`)
        .asGet().withBaseUrl('')
        .send().then(res => {
            if (!res.content.error) {
                this.report.address.city = `${res.content.address.city}, ${res.content.address.state}`;
            }
        });
        // get report category before activating the view
        return Category.get(category)
            .then(c=> newReport.category = c)
            // save on memory to show it in the card list
            .then(() => this.memory.save(newReport))
            .then(report => this.report = report);
    }

    deactivate() {
        // delete if not saved on server
        if (!this.report.id) {
            return this.memory.delete(this.report);
        }
    }

    formValid() {
        this.errors.length = 0;
        if (empty(this.report.title)) {
            this.errors.push(errorsMsg['title.required']);
        }
        if (minLength(this.report.title, 5)) {
            this.errors.push(errorsMsg['title.length']);
        }
        if (empty(this.report.description)) {
            this.errors.push(errorsMsg['description.required']);
        }
        if (minLength(this.report.description, 10)) {
            this.errors.push(errorsMsg['description.length']);
        }
        return this.errors.length === 0;
    }
}

function imgurDataToPhoto(res, username) {
    var link = res.data.link;
    var pic = new Picture();
    return Object.assign(pic, {
        url: link,
        thumbUrl: link.substr(0, link.length - 4) + 'm' + link.substr(link.length - 4),
        date: new Date(res.data.datetime),
        author: new CitizenShort(username)
    });
}

function uploadPhoto(file, user) {
    var data = new FormData();
    data.append('image', file);
    // NOTE: using window.fetch to post image
    return fetch(IMGUR_URL, {method: 'post', headers: {'Authorization': IMGUR_ID}, body: data})
        .then(res => {
            let json = res.json();
            return res.status >= 200 && res.status < 300
                ? json
                : json.then(Promise.reject.bind(Promise));
        })
        .then(d => imgurDataToPhoto(d, user.username));
}

// TODO move to utlity lib
// validations

function minLength(str, length) {
    return !empty(str) && str.length < length;
}

function empty(str) {
    return str == null || str.trim() === '';
}
