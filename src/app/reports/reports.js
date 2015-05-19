import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Map} from 'lib/map';
import {Compiler} from 'lib/util';
import {Report} from './models/report';

// mapbox custom map access token
const MAP_TOKEN = 'pk.eyJ1Ijoib2xhbm9kIiwiYSI6IjdZdV9iTTQifQ.HP-razZKsNmITPgHs4ugIA';
const TILES_URL = 'http://api.tiles.mapbox.com/v4/robjalkh.a4368786/{z}/{x}/{y}.png';

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
        document.addEventListener('divmarker', e=> this.compileMarker(e.detail));
        // TODO move to card list
        document.addEventListener('click', deactivateCardsOnClick);
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
        var cards = document.querySelectorAll('yi-card'),
            list = document.querySelector('yi-card-list'),
            activeCard;

        // switch classes
        for (let card of cards) {
            if (report === card.yiCard.report) {
                activeCard = card;
                card.classList.add('selected');
                card.classList.remove('not-selected');
            } else {
                card.classList.add('not-selected');
                card.classList.remove('selected');
            }
        }
        // scroll to card
        list.scrollTop = activeCard.offsetTop - list.offsetHeight / 2 + activeCard.offsetHeight / 2;
    }

    activate() {
        return Report.find().then(reports => this.reports = reports);
    }

    attached() {
        this.map.mapElement = document.querySelector('leaflet-map');
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

function deactivateCardsOnClick(e) {
    var name = e.target.tagName.toLowerCase();
    if (name !== 'leaflet-map' && name !== 'yi-card') {
        for (let card of document.querySelectorAll('yi-card')) {
            card.classList.remove('selected');
            card.classList.remove('not-selected');
        }
    }
}
