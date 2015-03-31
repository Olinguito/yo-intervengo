import {Map} from 'lib/map';
import {BackEnd} from './deleteme-backend';
import {Router} from 'aurelia-router';

export class Reports {

    static inject() { return [Router, BackEnd, Map]}

    constructor(router, backend, mainMap) {
        this.bE = backend;
        // reports sub router
        this.router = router;
        this.router.configure(config => {
            config.map([
                {route: 'new/:type/:category/:subCategory', moduleId: 'app/reports/report-new', id: 'report-new', title: ''},
                {route: ':name', moduleId: 'app/reports/report-detail', id: 'report-detail', title: ''},
                {route: '', moduleId: 'app/reports/search', id: 'search', title: ''}
            ]);
        });
        // Map container
        this.map = mainMap;
        // leaflet map config
        this.mapConf = {
            zoomControl: false,
            attributionControl: false,
            minZoom: 5,
            tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            // tiles: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
        };
    }

    activate(params, queryString, config) {
        this.reports = this.bE.getReports();
    }

    attached() {
        this.map.mapElement = document.querySelector('leafletMap');
    }

    get activeSubSection() {
        return this.router.currentInstruction.config.id || '';
    }

}
