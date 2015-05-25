import {inject, customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from './yi-card.css!text';
import {Router} from 'aurelia-router';
import {Map} from 'lib/map';

@customElement('yi-card')
@useShadowDOM
@inject(Element, Router, Map)
@bindable({ name: 'report' })
export class YiCard {

    constructor(element, router, mainMap) {
        this.element = element;
        this.router = router;
        this.map = mainMap;
    }

    bind() {
        //
        if (!this.report.id) {
            this.element.classList.add('new');
        }
        // observe id change to remove 'new' class
        Object.observe(this.report, this.onIdChange.bind(this));
    }

    onIdChange(changes) {
        for (let change of changes) {
            if (change.name === 'id' && change.object.id) {
                this.element.classList.remove('new');
            }
        }
    }

    // when header is clicked open detail view
    openDetail() {
        if (this.report.id) {
            this.router.navigate(this.report.id);
        }
    }

    centerMarker() {
        var {lat, lng} = this.report.location,
            // leaflet map instance
            lfMap = this.map.mapElement.map,
            // marker lat,lng to pixels
            {x, y} = lfMap.latLngToContainerPoint([lat, lng]),
            cardListWidth = document.querySelector('yi-card-list').offsetWidth,
            // add offset to the map center
            coords = lfMap.containerPointToLatLng([x + cardListWidth / 2, y]);
        this.map.center.lat = coords.lat;
        this.map.center.lng = coords.lng;
        this.map.zoom = 16;
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
