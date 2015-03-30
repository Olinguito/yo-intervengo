import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
import style from 'app/elements/selector/yi-button.css!text';

export class YiButton {
    static metadata() {
        return Behavior
            .customElement('yi-button')
            .withProperty('title')
            .withProperty('value')
            .withProperty('selected')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
        this.title = '';
        this.selected = false;
    }

    select() {
        // remove selected property from siblings
        var siblings = this.element.parentNode.querySelectorAll(':scope > yi-button');
        for (let btn of siblings) {
            btn.selected = false;
            btn.setAttribute('selected', false);
        }
        // add selected to current button
        this.element.selected = true;
        this.element.setAttribute('selected', true);
    }

    bind() {
        //TODO:  should be added to the template element before compile (aurelia fix pending)
        addStyle(this.element, style);
    }

}
