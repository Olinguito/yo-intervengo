import {inject, customElement, useShadowDOM, bindable, bindingMode as b, computedFrom} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-tabs.css!text';

@customElement('yi-tabs')
@useShadowDOM
@inject(Element)
export class YiTabs {
    @bindable({defaultBindingMode: b.twoWay}) selected;
    value;
    tabs = [];

    constructor(ele) {
        this.element = ele;
    }

    attached() {
        this.tabs = Array.prototype.slice.call(this.element.querySelectorAll('yi-tab'));
        this.tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => this.selected = i);
        });
        // initialize here so element exsists for tip position computation
        this.selected = +this.selected || 0;
        // seamless === true -> hide tip
        // this.seamless = this.element.getAttribute('seamless') !== null;
    }

    selectedChanged(n, o) {
        if (o != null) {
            this.tabs[o].classList.remove('active');
        }
        this.tabs[n].classList.add('active');
        this.value = this.tabs[n].yiTab.value;
    }

    @computedFrom('selected')
    get tipPosition() {
        // position tip in the middle of the selected tab
        return `${this.element.offsetWidth * (2 * this.selected + 1) / (2 * this.tabs.length)}px`;
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
