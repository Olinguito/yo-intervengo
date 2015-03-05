import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from 'app/elements/card/yi-card.css!text';
import {categories} from 'app/app';

export class YiCard {

    static metadata() {
        return Behavior
            .customElement('yi-card')
            .withProperty('report')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
    }

    bind() {
        //TODO:  should be added to the template element before compile (aurelia fix pending)
        addStyle(this.element, style);
    }

    get typeClass() {
        return this.report.type ? 'complain': 'request';
    }

    get category() {
        return categories[this.report.category[0]];
    }

    get subCategory() {
        return categories[`${this.report.category[0]}.${this.report.category[1]}`];
    }
}
