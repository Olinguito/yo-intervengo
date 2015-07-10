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

/**
 * Compiler service
 * compiles an HTML element with aurelia behaviors
 */
export class Compiler {
    static inject() { return [ViewCompiler, ResourceRegistry, Container]; }
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

export function compileMarker(compiler, marker) {
    var ctx = marker.element.primaryBehavior.boundProperties[0].binding.source;
    compiler.compile(marker.icon, ctx);
    // workaround to set the lat/lng of the marker correctly
    // TODO: investigate why it doesn't set them automatically
    // marker.element.latitude = ctx.report.location.lat;
    // marker.element.longitude = ctx.report.location.lng;
}

/**
 * List as tree
 * transform a list of objects into a tree like structure
 */
export function asTree(list, id = 'id', children = 'children', parent = 'parent', copy = true) {
    var treeList = [], lookup = {};

    for (let obj of list) {
        lookup[obj[id]] = obj;
        obj[children] = [];
    }
    for (let obj of list) {
        if (typeof obj[parent] !== 'undefined' && obj[parent] !== null) {
            lookup[obj[parent]][children].push(copy ? simpleCopy(obj) : obj);
        } else {
            treeList.push(copy ? simpleCopy(obj) : obj);
        }
    }
    return treeList;
}

function simpleCopy(obj) {
    var object = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            object[p] = obj[p];
        }
    }
    return object;
}
