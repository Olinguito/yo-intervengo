import {Coords} from 'lib/map';
import {categories} from 'app/app';

/**
 * Report Model
 */
export class Report {
    constructor(data = {}) {
        // main info
        this.title = data.title || '';
        this.description = data.description || '';
        this.address = data.address || '';
        this.coords = new Coords(data.lat, data.lng);
        this.category = null;

        this.date = data.date || new Date;
        this._persisted = false;
    }
}

export class Request extends Report {
    constructor(data) {
        super(data);
        this.type = 0;
    }
}

export class Complain extends Report {
    constructor(data) {
        super(data);
        this.type = 1;
    }
}

export class Category {
    constructor(tree) {
        this.path = tree.join('.');
        this.name = categories[this.path] || tree[tree.length-1];
        this.parent = tree.length > 1 ? new Category(tree.slice(0,-1)) : null;
    }
}
