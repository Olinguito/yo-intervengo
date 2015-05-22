import {inject, customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-icon.css!text';

/**
 * Custom element containing the icons of the application
 * TODO. In a future version it should allow transitioning from one icon to another
 */
@useShadowDOM
@customElement('yi-icon')
@inject(Element)
@bindable({name: 'icon'})
export class YiIcon {
    shownIcon = null;

    constructor(element) {
        this.element = element;
    }

    attached() {
        if (this.icon)
            this.shownIcon = this.element.shadowRoot.getElementById(this.icon);
        if (this.shownIcon)
            this.shownIcon.classList.add('show');
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
