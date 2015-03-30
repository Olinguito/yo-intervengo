import {Behavior} from 'aurelia-framework';
import {addStyleToShadowElement as addStyle} from 'lib/util';
import style from './yi-photo-button.css!text';

export class YiPhotoButton {
    static metadata() {
        return Behavior
            .customElement('yi-photo-button')
            .withProperty('title')
            .withProperty('filechange')
            .useShadowDOM();
    }

    static inject() { return [Element] }
    constructor(ele) {
        this.element = ele;
        this.inputFile = null;
    }

    fileChosen() {
        var file = this.inputFile.files[0];
        this.filechange(file);
    }

    bind() {
        addStyle(this.element, style);
    }

    attached() {
        this.inputFile = this.element.shadowRoot.querySelector('input');
    }
}
