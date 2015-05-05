import {customElement, useShadowDOM, bindable, bindingMode} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-search-tool.css!text';

@customElement('yi-search-tool')
@useShadowDOM
@bindable({ name: 'query', defaultBindingMode: bindingMode.twoWay, defaultValue: '' })
export class YiSearchTool {

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
