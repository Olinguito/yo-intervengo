import {inject, customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-button.css!text';

@customElement('yi-button')
@useShadowDOM
@inject(Element)
// has 3 states true, false, null(attribute removed)
@bindable({name: 'selected', defaultValue: null, changeHandler: 'selectedChanged'})
@bindable({name: 'title', defaultValue: ''})
@bindable({name: 'icon', defaultValue: ''})
@bindable({name: 'value'})
export class YiButton {
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
