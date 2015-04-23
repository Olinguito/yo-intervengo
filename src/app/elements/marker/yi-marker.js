import {inject, customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from './yi-marker.css!text';

@customElement('yi-marker')
@useShadowDOM
@inject(Element)
export class YiMarker {

    @bindable icon;

    constructor(element) {
        this.element = element;
    }

    toggleType() {
        this.element.classList.toggle('alt');
    }

    bounce() {
        this.element.animate([
                {transform: 'translateY(0px)'},
                {transform: 'translateY(-30px)'},
                {transform: 'translateY(0px)'},
                {transform: 'translateY(-8px)'},
                {transform: 'translateY(0px)'}
            ], {
                direction: 'alternate', duration: 350, iterations: 1
            }
        );
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
