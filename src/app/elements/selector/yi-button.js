import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
import style from './yi-button.css!text';

export class YiButton {
    static metadata() {
        return Behavior
            .customElement('yi-button')
            .withProperty('title')
            .withProperty('value')
            .withProperty('selected', 'selectedChanged')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
        this.title = '';
        // has 3 states true, false, null(attribute removed)
        this.selected = null;
    }

    selectedChanged(value) {
        if (value === true) {
            this.element.setAttribute('selected', true);
        } else if (value === false) {
            this.element.setAttribute('selected', false);
        } else {
            this.element.removeAttribute('selected');
        }
    }

    bind() {
        //TODO:  should be added to the template element before compile (aurelia fix pending)
        addStyle(this.element, style);
    }

}
