import {Behavior} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-button.css!text';

export class YiButton {
    static metadata() {
        return Behavior
            .customElement('yi-button')
            .withProperty('title')
            .withProperty('icon')
            .withProperty('value')
            .withProperty('selected', 'selectedChanged')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
        this.title = '';
        this.icon = '';
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

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
