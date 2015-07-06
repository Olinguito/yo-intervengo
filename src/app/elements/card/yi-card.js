import {inject, customElement, useShadowDOM, bindable, computedFrom} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from './yi-card.css!text';
import {Router} from 'aurelia-router';
import {Map} from 'lib/map';
import {CARD_LIST_WIDTH} from 'yi/app';

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

    // @computedFrom('this.report.photo.url', 'this.report.photo.thumbUrl') // why isn't it working? :'(
    get photoCover() {
        var photo = this.report.photo,
            url = photo && photo.thumbUrl || photo.url || '';
        return { 'background-image': `url(${url})` };
    }

    bind() {
        if (!this.report.id) {
            this.element.classList.add('new');
        }
        // observe id change to remove 'new' class
        // TODO use pollyfill
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
        const DEF_ZOOM = 15;
        var {lat, lng} = this.report.location,
            offset = [CARD_LIST_WIDTH / 2, 0];
        // center map on marker location + offset
        this.map.setCenter(lat, lng, offset)
        .then(() => new Promise(res=> setTimeout(res, 500)))
        .then(() => {
            // zoom if far
            if (this.map.zoom < DEF_ZOOM) {
                this.map.setZoom(DEF_ZOOM, offset);
            }
        });
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
