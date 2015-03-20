import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
import style from 'app/elements/selector/yi-selector.css!text';

export class YiSelector {
    static metadata() {
        return Behavior
            .customElement('yi-selector')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
        this.selection = [];
        this.mainBtn = null;
        var buttons = this.element.querySelectorAll('yi-button');
        for (let btn of buttons)
            btn.addEventListener('click', e => {
                e.stopPropagation();
                this.select(e.target);
            });
    }

    toggle() {
        this.element.classList.toggle('opened');
        // reset buttons state
        for (let btn of this.element.querySelectorAll('yi-button'))
            btn.removeAttribute('selected');
    }

    select(btn) {
        // adds select property to button and deletes it from siblings
        btn.yiButton.select();
        // add button copy to navigation
        this.selection.push(btn.title);
        console.log(this.selection);
    }

    bind() {
        this.mainBtn = this.element.shadowRoot.querySelector('#main yi-button');
        //TODO:  should be added to the template element before compile (aurelia fix pending)
        addStyle(this.element, style);
    }
}

function onBtnSelect(event) {

}
