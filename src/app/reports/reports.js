import {Map} from 'lib/map';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';

export class Reports {

    static inject() { return [Router, HttpClient]}

    constructor(router, http) {
        this.http = http;
        // reports sub router
        this.router = router;
        this.router.configure(config => {
            config.map([
                {route: ':name', moduleId: 'app/reports/report-detail', id: 'report-detail', title: ''},
                {route: '', moduleId: 'app/reports/search', id: 'search'}
            ]);
        });
        // Map container
        this.map = new Map();
        // leaflet map config
        this.mapConf = {
            zoomControl: false,
            attributionControl: false,
            minZoom: 5,
            tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            // tiles: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
        }
    }

    activate(params, queryString, config) {
        return this.http.get('/reports.json')
            .then(data => {
                this.reports = JSON.parse(data.response) || [];
            });
    }

    attached() {
        this.map.mapElement = document.querySelector('leafletMap');
    }

    get activeSubSection() {
        return this.router.currentInstruction.config.id || '';
    }


}
