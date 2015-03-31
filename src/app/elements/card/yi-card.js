import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from 'app/elements/card/yi-card.css!text';
import {categories} from 'app/app';
import {Router} from 'aurelia-router';

export class YiCard {

    static metadata() {
        return Behavior
            .customElement('yi-card')
            .withProperty('report')
            .useShadowDOM();
    }

    static inject() { return [Element, Router]; }

    constructor(element, router) {
        this.element = element;
        this.router = router;
    }

    bind() {
        //TODO:  should be added to the template element before compile (aurelia fix pending)
        addStyle(this.element, style);
    }
}
