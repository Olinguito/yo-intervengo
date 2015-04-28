import {customElement, useShadowDOM} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-card-list.css!text';

@customElement('yi-card-list')
@useShadowDOM
export class YiCardList {
    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
