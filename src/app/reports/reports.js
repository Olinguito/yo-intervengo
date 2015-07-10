import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Map} from 'lib/map';
import {Compiler, compileMarker} from 'lib/util';
import {Report} from './models/report';

// mapbox custom map access token
export const MAP_TOKEN = 'pk.eyJ1Ijoib2xhbm9kIiwiYSI6IjdZdV9iTTQifQ.HP-razZKsNmITPgHs4ugIA';
export const TILES_URL = 'http://api.tiles.mapbox.com/v4/robjalkh.a4368786/{z}/{x}/{y}.png';

@inject(Map, Compiler)
export class Reports {
    // leaflet map configurations
    mapConf = {
        zoomControl: false,
        attributionControl: false,
        minZoom: 5,
        tiles: `${TILES_URL}?access_token=${MAP_TOKEN}`
    };
    // search query property
    query = '';
    // current selected report
    activeReport = null;

    constructor(mainMap, compiler) {
        this.compiler = compiler;
        // Map container
        this.map = mainMap;
        //
        document.addEventListener('divmarker', e=> compileMarker(this.compiler, e.detail));
    }

    configureRouter(config, router) {
        // reports sub router
        this.router = router;
        config.map([
            {route: 'new/:type/:category', moduleId: 'yi/reports/report-new', id: 'report-new', title: ''},
            {route: ':slug', moduleId: 'yi/reports/report-detail', id: 'report-detail', title: ''},
            {route: '', moduleId: 'yi/reports/report-main', id: 'search', title: ''}
        ]);
    }

    get activeSubSection() {
        return this.router.currentInstruction.config.id || '';
    }

    /**
     * adds selected or not-selected class to the corresponding yi-cards
     */
    highlightReportCard(report) {
        this.activeReport = report;
        // scroll card to top
        // setTimeout to execute in future when the 'selected' class is aplied
        setTimeout(() => document.querySelector('yi-card.selected').scrollIntoView(), 0);
    }

    activate() {
        return Report.find().then(reports => this.reports = reports);
    }
}

/**
 * Card sorting
 * TODO check if comparisons are correct
 */
export class SortValueConverter {
    toView(reports, sort) {
        if (sort) {
            return reports.sort(this[sort + 'Sort']);
        } else {
            return reports;
        }
    }

    alphaSort(a, b) {
        var title1 = a.title.toLowerCase(), title2 = b.title.toLowerCase();
        if (title1 < title2) {
            return -1;
        }
        if (title1 > title2) {
            return 1;
        }
        return 0;
    }

    locationSort(a, b) {
        // TODO
        return -1;
    }

    supportsSort(a, b) {
        return b.supporters - a.supporters;
    }

    dateSort(a, b) {
        return (a.date.valueOf() < b.date.valueOf()) - (a.date.valueOf() > b.date.valueOf());
    }
}
