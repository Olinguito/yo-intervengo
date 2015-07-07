import {customElement, useShadowDOM, bindable, bindingMode as b} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-search-tool.css!text';

@customElement('yi-search-tool')
@useShadowDOM
export class YiSearchTool {
    @bindable({defaultBindingMode: b.twoWay})
    query = '';

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
