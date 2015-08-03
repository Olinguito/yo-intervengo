import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Category, Report, reportType as t} from './models';
import {MemoryBackend} from 'lib/backend/backend';
import Map from './map';
import {User} from 'lib/user';

const IMGUR_ID = 'Client-ID e84b4d7dc9700e0';
const IMGUR_URL = 'https://api.imgur.com/3/image';

@inject(Router, MemoryBackend, Map, User)
export class ReportNew {
    report = null;
    photoFile = null;
    // form errors
    errors = [];

    constructor(router, memory, map, user) {
        this.memory = memory;
        this.map = map;
        this.map.config.maxZoom = 20;
        this.router = router;
        this.user = user;
    }

    photoSelected(file) {
        this.photoUrl = URL.createObjectURL(file);
        this.photoFile = file;
        // set photo-button image
        this.photoArea.style.backgroundImage = `url(${this.photoUrl})`;
        this.report.photo.url = this.photoUrl;
    }

    saveReport() {
        var photoOk = Promise.resolve();
        if (!this.formValid()) {
            return;
        }
        // upload photo
        if (this.photoFile) {
            photoOk = uploadPhoto(this.photoFile)
                .then(p => this.report.photo = p)
                // delete on memory loaded image
                .then(URL.revokeObjectURL(this.photoUrl));
        }
        // save report
        photoOk.then(() => this.report.save())
            .then(()=> this.router.navigateBack())
            .catch(e => console.error(e));
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

        return Category.findOne({slug: category})
            .then(c=> newReport.category = c)
            // get and assign parent to category
            .then(c=> Category.findOne({slug: c.parent}))
            .then(p => newReport.category.parent = p)
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
        if (this.report.title == null || this.report.title.trim() === '') {
            this.errors.push({msg: 'Title is required'});
        }
        if (this.report.description == null || this.report.description.trim() === '') {
            this.errors.push({msg: 'Description is required'});
        }
        return this.errors.length === 0;
    }
}

function imgurDataToPhoto(res) {
    var link = res.data.link;
    return {
        url: link,
        thumbUrl: link.substr(0, link.length - 4) + 'm' + link.substr(link.length - 4),
        date: res.data.datetime
    };
}

function uploadPhoto(file) {
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
        .then(d => imgurDataToPhoto(d));
}
