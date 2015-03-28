import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
import style from './responsive-form.css!text';

export class ResponsiveForm {
    static metadata() {
        return Behavior
            .customElement('responsive-form')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(ele) {
        this.element = ele;
        this.currStep = 0;
        this.numberOfSteps = 3;
    }

    prev() {
        if (this.currStep > 0)
            this.currStep--;
        console.log(this.currStep);
    }

    next() {
        if (this.currStep < this.numberOfSteps)
            this.currStep++;
        console.log(this.currStep);
    }

    done() {
        if (this.inLastStep)
            console.log('finished!');
    }

    get inLastStep() {
        return this.currStep === this.numberOfSteps;
    }

    bind() {
        addStyle(this.element, style);
    }
}
