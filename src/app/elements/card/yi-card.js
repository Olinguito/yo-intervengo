import {inject, customElement, useShadowDOM, bindable, computedFrom} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from './yi-card.css!text';
import {Router} from 'aurelia-router';

@customElement('yi-card')
@useShadowDOM
@inject(Element, Router)
export class YiCard {
    @bindable report;
    @bindable onSelect = ()=> {};

    constructor(element, router) {
        this.element = element;
        this.router = router;
    }

    @computedFrom('this.report.photo.url', 'this.report.photo.thumbUrl') // why isn't it working? :'(
    get photoCover() {
        var photo = this.report.photo,
            url = photo && photo.thumbUrl || photo.url || '';
        return { 'background-image': `url(${url})` };
    }

    bind() {
        if (!this.report.id) {
            this.element.classList.add('new');
        }
        // observe id change to remove 'new' class
        // TODO use pollyfill
        Object.observe(this.report, this.onIdChange.bind(this));
    }

    onIdChange(changes) {
        for (let change of changes) {
            if (change.name === 'id' && change.object.id) {
                this.element.classList.remove('new');
            }
        }
    }

    // when header is clicked open detail view
    openDetail() {
        if (this.report.id) {
            this.router.navigate(this.report.id);
        }
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
