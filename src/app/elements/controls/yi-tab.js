import {customElement, useShadowDOM, bindable, bindingMode as b} from 'aurelia-framework';

@customElement('yi-tab')
@useShadowDOM
export class YiTab {
    @bindable({defaultBindingMode: b.twoWay}) value = null;
    @bindable icon = null;
}
