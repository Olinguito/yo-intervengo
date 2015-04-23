import {customElement, useShadowDOM} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-search-tool.css!text';

@customElement('yi-search-tool')
@useShadowDOM
export class YiSearchTool {

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
