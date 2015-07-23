import {inject, customElement, useShadowDOM, bindable, bindingMode as b} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-card-list.css!text';
import Map from 'yi/reports/map';

@customElement('yi-card-list')
@useShadowDOM
@inject(Element, Map)
export class YiCardList {
    @bindable({defaultBindingMode: b.twoWay})
    active = null;
    @bindable reports;
    orderOptions = [
        { title: 'Orden alfabético', icon: 'az', name: 'alpha' },
        { title: 'Mas cercanos', icon: 'location', name: 'location' },
        { title: 'Número de respaldos', icon: 'hand', name: 'supports' },
        { title: 'Fecha de creación', icon: 'recent', name: 'date' }
    ];

    constructor(element, map) {
        this.ele = element;
        this.map = map;
    }

    attached() {
        this.select(this.orderOptions[3]);
    }

    select(opt) {
        this.order = opt.name;
    }

    highlight(report, scroll = true) {
        this.active = report;
        if (scroll) {
            setTimeout(() =>
                this.ele.shadowRoot.querySelector('.card-highlight.active').scrollIntoView()
            );
        }
    }

    // card icon clicked
    cardSelected(report) {
        const DEF_ZOOM = 14;
        // center map on marker
        this.map.setCenter(report.location.lat, report.location.lng);
        if (this.map.zoom > DEF_ZOOM) {
            this.map.zoom = DEF_ZOOM;
        }
        // highlight card
        this.highlight(report, false);
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
