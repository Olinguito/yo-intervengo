import {Map} from 'lib/map';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';

var categories = [
    {
        name: 'new request',
        slug: 'request',
        categories: [
            {name: 'mobility', slug: 'mobility', categories: [
                {name: 'crossing', slug: 'crossing'},
                {name: 'road', slug: 'road'}
            ]},
            {name: 'buildings', slug: 'buildings', categories: [
                {name: 'bridge', slug: 'bridge'}
            ]},
            {name: 'security', slug: 'security', categories: [
                {name: 'policemen', slug: 'policemen'}
            ]},
            {name: 'public services', slug: 'public-services', categories: [
                {name: 'water', slug: 'water'},
                {name: 'electricity', slug: 'electricity'},
                {name: 'internet', slug: 'internet'}
            ]},
            {name: 'environment', slug: 'environment', categories: [
                {name: 'trash can', slug: 'trash-can'}
            ]},
            {name: 'other', slug: 'other', categories: [
                {name: 'new event', slug: 'event'}
            ]}
        ]
    },
    {
        name: 'new complain',
        slug: 'complain',
        categories: [
            {name: 'mobility', slug: 'mobility', categories: [
                {name: 'hole', slug: 'hole'},
                {name: 'crossing', slug: 'crossing'}
            ]},
            {name: 'buildings', slug: 'buildings', categories: [
                {name: 'stadium', slug: 'stadium'}
            ]},
            {name: 'security', slug: 'security', categories: [
                {name: 'dangerous zone', slug: 'dangerous-zone'},
                {name: 'gangs', slug: 'gangs'}
            ]},
            {name: 'public services', slug: 'pub-services', categories: [
                {name: 'water leak', slug: 'water-leak'}
            ]},
            {name: 'environment', slug: 'environment', categories: [
                {name: 'polution', slug: 'polution'}
            ]},
            {name: 'other', slug: 'other', categories: [
                {name: 'noise', slug: 'noise'}
            ]}
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

    newReport(selector) {
        console.log('new-report',selector.selection);
        this.router.navigate(`new/${selector.selection.join('/')}`);
        selector.toggle();

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
