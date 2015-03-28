import {Coords} from 'lib/map';

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

