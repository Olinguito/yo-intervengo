import {ResourceRegistry, ViewCompiler, ViewSlot, Container} from 'aurelia-framework';

/**
 * Set of utility functions to use in the project
 */

export function addStyleToShadowElement(element, style) {
    if (element.shadowRoot) {
        let styleSheet = document.createElement('style');
        styleSheet.appendChild(document.createTextNode(style));
        element.shadowRoot.appendChild(styleSheet);
    }
}


export function mergeImages(img1, img2) {
    return new Promise((resolve, reject) => {

    });
}

function createContext(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
}


/**
 * Compiler service
 * compiles an HTML element with aurelia behaviors
 */
export class Compiler {
    static inject() {return [ViewCompiler, ResourceRegistry, Container]}
    constructor(compiler, appResources, diContainer) {
        this.compiler = compiler;
        this.resources = appResources;
        this.container = diContainer;
    }

    compile(element, ctx = null) {
        element.classList.remove('au-target');
        var containerElement = element.parentNode;
        var slot = new ViewSlot(containerElement, true);
        var tpl = templateFromElement(element);
        var view = this.compiler.compile(tpl, this.resources).create(this.container, ctx);
        slot.add(view);
        slot.attached();
    }
}

function templateFromElement(element) {
    var tpl = document.createElement('template');
    tpl.content.appendChild(element);
    return tpl;
}
