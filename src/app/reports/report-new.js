import {Parent} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Complain, Request, Category} from './report';
import {Map, Coords} from 'lib/map';
import {BackEnd} from './deleteme-backend';

export class ReportNew {
    static inject() { return [Map, BackEnd, Parent.of(Router)]; }

    constructor(mainMap, backend, router) {
        this.bE = backend;
        this.report = null;
        this.center = new Coords(mainMap.center);
        this.r = router;
        this.mapConf = {
            zoomControl: false,
            attributionControl: false,
            minZoom: 12,
            tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        };
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
        if (this.report.title != null && this.report.title.trim() !== '' &&
            this.report.description != null && this.report.description.trim() !== '') {
            // TODO: remove when two-way binding on custom elements is fixed
            var map = document.querySelector('#report-new leaflet-map');
            this.report.location.lat = map.latitude;
            this.report.location.lng = map.longitude;
            // TODO: persist report
            // temporal slug for report
            this.report.id = this.report.title.trim().toLowerCase().replace(/ /g, '-');
            this.r.navigateBack();
        }
    }

    activate(params) {
        var {type, category, subCategory} = params;
        this.report = type === 'request' ?
            new Request : type === 'complain' ?
            new Complain : null;
        // TODO: change when backend implemented
        this.report.category = new Category([category,subCategory]);
        // add new report to reports collection
        this.bE.getReports().push(this.report);
    }

    deactivate() {
        // delete unsaved report
        if (!this.report.id) {
            let reports = this.bE.getReports();
            var index = reports.indexOf(this.report);
            reports.splice(index, 1);
        }
    }
}
