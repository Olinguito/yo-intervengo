import {inject, customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-selector.css!text';

/**
 * YiSelector - New report category selector
 */
@customElement('yi-selector')
@useShadowDOM
@inject(Element)
export class YiSelector {
    @bindable onSelect = ()=> {};
    @bindable icon = 'plus';
    selection = [];

    constructor(element) {
        this.element = element;
    }

    /**
     * Opens/Closes the selector
     */
    toggle() {
        this.selection.length = 0;
        this.element.classList.toggle('opened');
        // reset buttons state
        deselectYiButtons(this.element);
    }

    /**
     * Callback called when a `yi-button` in the selector is clicked
     * @param btn
     */
    onYiBtnClick(btn) {
        // adds 'select' property to a yi-button and deletes it from siblings
        selectYiButton(btn);
        this.selection.push(btn.yiButton);
        // if can't go deeper in the selection execute onSelect
        if (btn.querySelectorAll('yi-button').length === 0) {
            this.onSelect(this.selection);
        }
    }

    navBtnClicked($event) {
        var btn = $event.target,
            index = getIndex(btn.parentNode);
        deselectYiButtons(this.selection[index].element);
        //
        this.selection.splice(index);
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

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}

//

function getIndex(node) {
    var childNodes = node.parentNode.children;
    return Array.prototype.indexOf.call(childNodes, node);
}

function selectYiButton(yiBtn) {
    var siblings = yiBtn.parentNode.querySelectorAll(':scope > yi-button');
    for (let btn of siblings)
        btn.yiButton.selected = false;
    yiBtn.yiButton.selected = true;
}

function deselectYiButtons(node) {
    // deselect node and siblings if node is a yi-button
    if ('yiButton' in node) {
        let siblings = node.parentNode.querySelectorAll(':scope > yi-button');
        for (let btn of siblings) btn.yiButton.selected = null;
    }
    // deselect children yi-button
    for (let btn of node.querySelectorAll('yi-button'))
        btn.yiButton.selected = null;
}
