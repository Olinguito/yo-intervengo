import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Map} from 'lib/map';
import {BackEnd} from './deleteme-backend';

@inject(Router, BackEnd, Map)
export class Reports {
    mapConf = {
        zoomControl: false,
        attributionControl: false,
        minZoom: 5,
        tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        // tiles: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
    };

    constructor(router, backend, mainMap) {
        // leaflet map config
        this.bE = backend;
        // reports sub router
        this.router = router;
        this.router.configure(config => {
            config.map([
                {route: 'new/:type/:category/:subCategory', moduleId: 'yi/reports/report-new', id: 'report-new', title: ''},
                {route: ':name', moduleId: 'yi/reports/report-detail', id: 'report-detail', title: ''},
                {route: '', moduleId: 'yi/reports/search', id: 'search', title: ''}
            ]);
        });
        // Map container
        this.map = mainMap;
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
