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
            .withProperty('onSelect', null, 'select')
            .useShadowDOM();
    }

    static inject() { return [Element]; }

    constructor(element) {
        this.element = element;
        this.selection = [];
        this.onSelect = () => {console.log('fuu')}
    }

    /**
     * Opens/Closes the selector
     */
    toggle() {
        this.selection.length = 0;
        this.element.classList.toggle('opened');
        // reset buttons state
        for (let btn of this.element.querySelectorAll('yi-button'))
            btn.removeAttribute('selected');
    }

    /**
     * Callback called when a `yi-button` in the selector is clicked
     * @param btn
     */
    onYiBtnClick(btn) {
        // adds 'select' property to a yi-button and deletes it from siblings
        btn.yiButton.select();

        this.selection.push(btn.yiButton.value);
        // if can't go deeper in the selection execute onSelect
        if (btn.querySelectorAll('yi-button').length === 0)
            this.onSelect(this);
    }

    bind() {
        //TODO:  should be added to the template element before compile (aurelia fix pending)
        addStyle(this.element, style);
    }

    attached() {
        // bind click listener to yi-buttons
        for (let btn of this.element.querySelectorAll('yi-button')) {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                this.onYiBtnClick(e.target);
            });
        }
    }
}

// alias for document.createElement
function newEle(tag) {
    return document.createElement(tag);
}
