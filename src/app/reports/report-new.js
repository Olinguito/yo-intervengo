import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Category, Report, reportType as t} from './models';
import {serialize, MemoryBackend} from 'lib/backend/backend';
import {Map, Coords} from 'lib/map';
import {TILES_URL, MAP_TOKEN} from './reports';

@inject(Map, Router, MemoryBackend)
export class ReportNew {
    report = null;
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
        var imgArea = document.querySelector('#report-new .photo figure'),
            url = URL.createObjectURL(file);
        // set photo-button image
        imgArea.style.backgroundImage = `url(${url})`;
        this.report.photo.url = url;
    }

    saveReport() {
        var errors = validateReport(this.report);
        if (!errors.length) {
            this.report.save()
                .then(()=> this.router.navigateBack());
        } else {
            // TODO show errors
            console.error('report has errors ->', errors);
        }
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
