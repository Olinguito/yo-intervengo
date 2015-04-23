import {Behavior} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-search-tool.css!text';

export class YiSearchTool {

    static metadata() {
        return Behavior
            .customElement('yi-search-tool')
            .useShadowDOM();
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
