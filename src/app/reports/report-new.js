import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Category, Report, reportType as t} from './models';
import {MemoryBackend} from 'lib/backend/backend';
import {Map, Coords} from 'lib/map';
import {TILES_URL, MAP_TOKEN} from './reports';

const IMGUR_ID = 'Client-ID e84b4d7dc9700e0';
const IMGUR_URL = 'https://api.imgur.com/3/image';

@inject(Map, Router, MemoryBackend)
export class ReportNew {
    report = null;
    photoFile = null;
    mapConf = {
        zoomControl: false,
        attributionControl: false,
        minZoom: 14,
        tiles: `${TILES_URL}?access_token=${MAP_TOKEN}`
    };

    constructor(mainMap, router, memory) {
        this.memory = memory;
        this.mainMap = mainMap;
        this.router = router;
    }

    photoSelected(file) {
        var imgArea = document.querySelector('#report-new .photo figure');
        this.photoUrl = URL.createObjectURL(file);
        this.photoFile = file;
        // set photo-button image
        imgArea.style.backgroundImage = `url(${this.photoUrl})`;
        this.report.photo.url = this.photoUrl;
    }

    saveReport() {
        var errors = validateReport(this.report),
            photoOk = Promise.resolve();
        // TODO show errors
        if (errors.length) {
            return console.error('report has errors ->', errors);
        }
        // upload photo
        if (this.photoFile) {
            let data = new FormData();
            data.append('image', this.photoFile);
            photoOk = fetch(IMGUR_URL,
                {method: 'post', headers: {'Authorization': IMGUR_ID}, body: data}
            ).then(res => {
                let json = res.json();
                URL.revokeObjectURL(this.photoUrl);
                return res.status >= 200 && res.status < 300 ? json : json.then(Promise.reject.bind(Promise));
            }).then(d => imgurDataToPhoto(d))
            .then(p => this.report.photo = p);
        }
        // save report
        photoOk
        .then(() => this.report.save())
        .then(()=> this.router.navigateBack())
        .catch(e => console.error(e)); // TODO show error
    }

    attached() {
        // scroll to card on list
        document.querySelector('yi-card.new').scrollIntoView();
    }

    activate(params) {
        var {type, category} = params;
        this.report = new Report();
        this.report.type = type === 'request' ? t.request : t.complain;
        this.report.location = new Coords(this.mainMap.center);

        return Category.findOne({slug: category})
            .then(c=> this.report.category = c)
            // get and assign parent to category
            // TODO server should include parent data on respose
            .then(c=> Category.findOne({slug: c.parent}))
            .then(p => this.report.category.parent = p)
            // save on memory to show it in the card list
            .then(() => this.memory.save(this.report));
    }

    deactivate() {
        // delete if not saved on server
        if (!this.report.id) {
            return this.memory.delete(this.report);
        }
    }
}

function validateReport(report) {
    var errors = [];
    if (report.title == null || report.title.trim() === '') {
        errors.push({msg: 'Title is required'});
    }
    if (report.description == null || report.description.trim() === '') {
        errors.push({msg: 'Description is required'});
    }
    return errors;
}

function imgurDataToPhoto(res) {
    var link = res.data.link;
    return {
        url: link,
        thumbUrl: link.substr(0, link.length - 4) + 'm' + link.substr(link.length - 4),
        date: res.data.datetime
    };
}
