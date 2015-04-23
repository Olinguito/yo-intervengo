import {Behavior} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-icon.css!text';

/**
 * Custom element containing the icons of the application
 * TODO. In a future version it should allow transitioning from one icon to another
 */
export class YiIcon {
    static metadata() {
        return Behavior
            .customElement('yi-icon')
            .withProperty('icon')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
        this.shownIcon = null;
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
