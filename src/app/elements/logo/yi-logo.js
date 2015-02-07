import {Behavior} from 'aurelia-framework';

export class YiLogo {

    static metadata() {
        return Behavior
            .customElement('yi-logo')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
    }

}