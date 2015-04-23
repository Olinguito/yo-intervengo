import {customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './responsive-form.css!text';

@customElement('responsive-form')
@useShadowDOM
export class ResponsiveForm {

    @bindable submit;
    currStep = 0;
    numberOfSteps = 3;

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
