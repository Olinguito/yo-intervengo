import {Behavior} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './responsive-form.css!text';

export class ResponsiveForm {
    static metadata() {
        return Behavior
            .customElement('responsive-form')
            .withProperty('submit')
            .useShadowDOM();
    }

    constructor(ele) {
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
        this.submit();
    }

    get inLastStep() {
        return this.currStep === this.numberOfSteps;
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
