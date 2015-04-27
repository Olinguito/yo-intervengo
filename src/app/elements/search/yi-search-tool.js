import {customElement, useShadowDOM, bindable, TWO_WAY} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-search-tool.css!text';

@customElement('yi-search-tool')
@useShadowDOM
@bindable({
    name: 'query',
    defaultBindingMode: TWO_WAY,
    defaultValue: ''
})
export class YiSearchTool {


    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
