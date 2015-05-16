import {ResourceRegistry, ViewCompiler, ViewSlot, Container} from 'aurelia-framework';

/**
 * Set of utility functions to use in the project
 */
export function addStyleToTemplate(template, style = '') {
    if (template.content) {
        let styleSheet = document.createElement('style');
        styleSheet.appendChild(document.createTextNode(style));
        template.content.appendChild(styleSheet);
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


/**
 * List as tree
 * transform a list of objects into a tree like structure
 */
export function asTree(list, id = 'id', children = 'children', parent = 'parent') {
    var treeList = [], lookup = {};

    for (let obj of list) {
        lookup[obj[id]] = obj;
        obj[children] = [];
    }
    for (let obj of list) {
        if (typeof obj[parent] !== 'undefined' && obj[parent] !== null) {
            lookup[obj[parent]][children].push(obj);
        } else {
            treeList.push(obj);
        }
    }
    return treeList;
}
