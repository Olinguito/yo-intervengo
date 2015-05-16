import {inject, customElement, useShadowDOM, bindable} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-photo-button.css!text';

@customElement('yi-photo-button')
@useShadowDOM
@inject(Element)
@bindable({name: 'filechange'})
export class YiPhotoButton {

    @bindable title;
    inputFile = null;

    constructor(ele) {
        this.element = ele;
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
