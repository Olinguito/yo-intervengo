import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Category, Report, reportType as t} from './models';
import {serialize} from 'lib/backend/backend';
import {Map, Coords} from 'lib/map';

@inject(Map, Router)
export class ReportNew {
    report = null;
    mapConf = {
        zoomControl: false,
        attributionControl: false,
        minZoom: 12,
        tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
    };

    constructor(mainMap, router) {
        this.center = new Coords(mainMap.center);
        this.router = router;
    }

    photoSelected(file) {
        var reader = new FileReader(),
            img = document.querySelector('#report-new .photo figure');
        reader.onload = () => {
            img.style.backgroundImage = `url(${reader.result})`;
            //
            this.report.photo = reader.result;
        };
        reader.readAsDataURL(file);
    }

    saveReport() {
        var errors = validateReport(this.report);
        if (!errors.length) {
            this.report.date = new Date();
            this.report.location = this.center;
            this.report.save().then(()=>this.router.navigateBack());
        } else {
            // TODO show errors
            console.error('report has errors ->', errors);
        }
    }

    activate(params) {
        var {type, category} = params;
        this.report = new Report();
        this.report.type = type === 'request' ? t.request : t.complain;

        return Category.findOne({slug: category})
            .then(c=> this.report.category = c)
            // get and assign parent to category
            // TODO server should include parent data on respose
            .then(c=> Category.findOne({slug: c.parent}))
            .then(p => this.report.category.parent = p);
    }

    deactivate() {
        // TODO delete unsaved report
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
