import {Map} from 'lib/map';
import {Router} from 'aurelia-router';

export class Reports {

    static inject() { return [Router]}

    constructor(router) {
        // reports sub router
        this.router = router;
        this.router.configure(config => {
            config.map([
                {route: ':name', moduleId: 'app/reports/report-detail'},
                {route: '', moduleId: 'app/reports/search'}
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

    attached() {
        this.map.mapElement = document.querySelector('leafletMap');
    }

}
