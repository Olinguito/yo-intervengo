import {Map} from 'lib/map';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';

var categories = [
    {
        name: 'request',
        categories: [
            {name: 'mobility', categories: [
                {name: 'crossing'},
                {name: 'road'}
            ]},
            {name: 'buildings', categories: [
                {name: 'bridge'}
            ]},
            {name: 'security', categories: [
                {name: 'policemen'}
            ]},
            {name: 'public services', categories: [
                {name: 'water'},
                {name: 'electricity'}
            ]},
            {name: 'environment', categories: [
                {name: 'trash can'}
            ]},
            {name: 'other', categories: []}
        ]
    },
    {
        name: 'complain',
        categories: [
            {name: 'mobility', categories: [
                {name: 'hole'},
                {name: 'crossing'}
            ]},
            {name: 'buildings', categories: [
                {name: 'stadium'}
            ]},
            {name: 'security', categories: [
                {name: 'dangerous zone'}
            ]},
            {name: 'public services', categories: [
                {name: 'water leak'}
            ]},
            {name: 'environment', categories: [
                {name: 'polution'}
            ]},
            {name: 'other', categories: []}
        ]
    }
];

export class Reports {

    static inject() { return [Router, HttpClient, Map]}

    constructor(router, http, mainMap) {
        this.http = http;
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
        // example categories // TODO: get actual list of categories
        this.cats = categories;
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
