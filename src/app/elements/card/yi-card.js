import {Behavior} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from './yi-card.css!text';
import {categories} from 'yi/app';
import {Router} from 'aurelia-router';

export class YiCard {

    static metadata() {
        return Behavior.customElement('yi-card').withProperty('report').useShadowDOM();
    }

    static inject() { return [Element, Router]; }

    constructor(element, router) {
        this.element = element;
        this.router = router;
    }

    bind() {
        //
        this.element.classList.add(this.report.typeText);
        if (!this.report.id)
            this.element.classList.add('new');
        // observe id change to remove 'new' class
        Object.observe(this.report, this.onIdChange.bind(this));
    }

    onIdChange(changes) {
        for (let change of changes) {
            if (change.name == 'id' && change.object.id)
                this.element.classList.remove('new');
        }
    }

    // when header is clicked open detail view
    openDetail() {
        if (this.report.id) this.router.navigate(this.report.id);
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
