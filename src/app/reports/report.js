import {Coords} from 'lib/map';
import {categories} from 'app/app';

/**
 * Report Model
 */
export class Report {
    constructor(data = {}) {
        // main info
        this.id = data.id || null;
        this.title = data.title || '';
        this.description = data.description || '';
        this.address = data.address || '';
        this.photo = data.photo || '';
        this.location = new Coords(data.location);
        this.category = data.category ? new Category(data.category) : null;
        this.supporters = data.supporters || 0;

        this.date = data.date || new Date;
    }
}

export class Request extends Report {
    constructor(data) {
        super(data);
        this.type = 0;
    }

    get typeText() {
        return 'request';
    }
}

export class Complain extends Report {
    constructor(data) {
        super(data);
        this.type = 1;
    }

    get typeText() {
        return 'complain';
    }
}

export class Category {
    constructor(tree) {
        this.path = tree.join('.');
        this.name = categories[this.path] || tree[tree.length - 1];
        this.parent = tree.length > 1 ? new Category(tree.slice(0, -1)) : null;
    }
}
