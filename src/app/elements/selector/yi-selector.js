import {Behavior, ViewCompiler} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
import style from 'app/elements/selector/yi-selector.css!text';

/**
 * YiSelector - New report category selector
 */
export class YiSelector {
    static metadata() {
        return Behavior
            .customElement('yi-selector')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
        this.onSelect = ()=> {};
        this.selection = [];
//        this.mainBtn = null;
//        this.vc = viewCompiler;
    }

    /**
     * Opens/Closes the selector
     */
    toggle() {
        this.element.classList.toggle('opened');
        // reset buttons state
        for (let btn of this.element.querySelectorAll('yi-button'))
            btn.removeAttribute('selected');
    }

    /**
     * Callback called when a `yi-button` in the selector is clicked
     * @param btn
     */
    select(btn) {
        // adds 'select' property to a yi-button and deletes it from siblings
        btn.yiButton.select();
        // add button copy to navigation bar
//        this.element.shadowRoot.querySelector('#btns-list')
//            .appendChild(newEle('li'))
//            .appendChild(btn.cloneNode());

        this.selection.push(btn.title);

        // if can't go deeper in the selection execute onSelect
        if (btn.children.length === 0)
            this.onSelect(this.selection);
    }

    bind() {
//        this.mainBtn = this.element.shadowRoot.querySelector('#main');
        // bind click listeners
        //TODO:  should be added to the template element before compile (aurelia fix pending)
        addStyle(this.element, style);
    }

    attached() {
        // bind click listener to yi-buttons
        for (let btn of this.element.querySelectorAll('yi-button')) {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                this.select(e.target);
            });
        }
    }
}

// alias for document.createElement
function newEle(tag) {
    return document.createElement(tag);
}
