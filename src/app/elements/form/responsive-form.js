import {customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './responsive-form.css!text';

@customElement('responsive-form')
@useShadowDOM
@bindable({name: 'onSubmit', attribute: 'submit', defaultValue() {}})
export class ResponsiveForm {

    currStep = 0;
    numberOfSteps = 3;

    prev() {
        if (this.currStep > 0) {
            this.currStep--;
        }
    }

    next() {
        if (this.currStep < this.numberOfSteps) {
            this.currStep++;
        }
    }

    done() {
        this.onSubmit();
    }

    get inLastStep() {
        return this.currStep === this.numberOfSteps;
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
