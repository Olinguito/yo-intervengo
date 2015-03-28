import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
import style from './yi-photo-button.css!text';

export class YiPhotoButton {
    static metadata() {
        return Behavior
            .customElement('yi-photo-button')
            .withProperty('file')
            .withProperty('title')
            .useShadowDOM();
    }

    static inject() { return [Element] }
    constructor(ele) {
        this.element = ele;
        this.file = null;
        this.inputFile = null;
    }

    choseFile() {
        this.inputFile.click();
    }

    bind() {
        addStyle(this.element, style);
    }

    attached() {
        window.ff = this.inputFile = this.element.shadowRoot.querySelector('input');
    }
}
