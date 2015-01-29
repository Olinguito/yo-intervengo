import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from 'app/elements/marker/yi-marker.css!text';

export class YiMarker {

    static metadata() {
        return Behavior
            .customElement('yi-marker')
            .withProperty('category')
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

    bounce() {

    }

}