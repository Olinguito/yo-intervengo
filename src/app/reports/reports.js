import {Map} from 'lib/map';
import {Compiler} from 'lib/util';
import {BackEnd} from './deleteme-backend';
import {Router} from 'aurelia-router';

export class Reports {

    static inject() { return [Router, BackEnd, Map, Compiler]}

    constructor(router, backend, mainMap, compiler) {
        this.compiler = compiler;
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
        // leaflet map config
        this.mapConf = {
            zoomControl: false,
            attributionControl: false,
            minZoom: 5,
            tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            // tiles: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
        };
        //
        document.addEventListener('divmarker', (e)=> this.compileMarker(e.detail));
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

    /**
     * compile the aurelia yi-marker custom element
     */
    compileMarker(marker) {
        var ctx = marker.element.primaryBehavior.boundProperties[0].binding.source;
        this.compiler.compile(marker.icon, ctx);
        // workaround to set the lat/lng of the marker correctly
        // TODO: investigate why it doesn't set them automatically
        marker.element.latitude = ctx.report.location.lat;
        marker.element.longitude = ctx.report.location.lng;
    }
}

//

function delAttributes(element) {
    var attrs = Array.prototype.slice.call(element.attributes);
    for (let attr of attrs) {
        element.removeAttribute(attr.name)
    }
}
