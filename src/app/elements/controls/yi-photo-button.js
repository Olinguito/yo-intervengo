import {Behavior} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
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

    attached() {
        this.inputFile = this.element.shadowRoot.querySelector('input');
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
