import {Behavior} from 'aurelia-framework';

export class YiLogo {

    static metadata() {
        return Behavior
            .customElement('yi-logo')
            .useShadowDOM();
    }
}
