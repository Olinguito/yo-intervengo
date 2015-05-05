import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Map} from 'lib/map';
import {Compiler} from 'lib/util';
import {BackEnd} from './deleteme-backend';

@inject(Router, BackEnd, Map, Compiler)
export class Reports {
    mapConf = {
        zoomControl: false,
        attributionControl: false,
        minZoom: 5,
        tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        // tiles: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
    };

    // search query property
    query = '';

    constructor(router, backend, mainMap, compiler) {
        this.compiler = compiler;
        this.bE = backend;
        // Map container
        this.map = mainMap;
        //
        document.addEventListener('divmarker', (e)=> this.compileMarker(e.detail));
    }

    configureRouter(config, router) {
        // reports sub router
        this.router = router;
        config.map([
            {route: 'new/:type/:category/:subCategory', moduleId: 'yi/reports/report-new', id: 'report-new', title: ''},
            {route: ':name', moduleId: 'yi/reports/report-detail', id: 'report-detail', title: ''},
            {route: '', moduleId: 'yi/reports/search', id: 'search', title: ''}
        ]);
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
