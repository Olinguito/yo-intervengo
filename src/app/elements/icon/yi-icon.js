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
@bindable({name: 'animate'})
export class YiIcon {
    shownIcon = null;
    animation = null;

    constructor(element) {
        this.element = element;
    }

    animateChanged(animate) {
        if (this.animation) {
            if (animate) {
                this.animation.beginElement();
            } else {
                this.animation.endElement();
            }
        }
    }

    bind() {
        var shownIcon;
        if (this.icon) {
            shownIcon = this.element.shadowRoot.getElementById(this.icon);
            if (shownIcon) {
                shownIcon.classList.add('show');
                delSiblings(shownIcon);
            }
        }
        this.animation = this.element.shadowRoot.querySelector('.show .animation');
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}

function delSiblings(ele) {
    var previous = ele.previousSibling, next = ele.nextSibling;
    while (previous) {
        ele.parentNode.removeChild(previous);
        previous = ele.previousSibling;
    }
    while (next) {
        ele.parentNode.removeChild(next);
        next = ele.nextSibling;
    }
}
