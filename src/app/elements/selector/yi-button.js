import {inject, customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-button.css!text';

@customElement('yi-button')
@useShadowDOM
@inject(Element)
export class YiButton {

    @bindable title = '';
    @bindable icon = '';
    @bindable value;
    // has 3 states true, false, null(attribute removed)
    @bindable selected = null;

    constructor(element) {
        this.element = element;
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
