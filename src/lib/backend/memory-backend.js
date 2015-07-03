import {Backend} from './base-backend';
import {arrayPushOrReplace, intersection} from './util';

/**
 * Persists elements temporarily in memory
 */
export class MemoryBackend extends Backend {

    constructor() {
        super();
        // TODO define with decorator?
        Object.defineProperty(this, 'collections', {value: new Map()});
    }

    save(res) {
        var type = res.constructor,
            i = arrayPushOrReplace(this.getOrInit(type), res);
        return Promise.resolve(this.collections.get(type)[i]);
    }

    delete(res) {
        var resources = this.getOrInit(res.constructor),
            i = resources.indexOf(res);
        return i >= 0 ?
            Promise.resolve(resources.splice(i, 1)[0]) :
            Promise.reject('not found');
    }

    find(type, query = {}) {
        var result = this.getOrInit(type);
        // query non empty
        if (Object.keys(query).length > 0) {
            result = result.filter(res => intersection(res, query));
        }
        return Promise.resolve(result);
    }

    findSync(type, cb) {
        // TODO make part of base-backend?, implement query?
        cb(this.getOrInit(type));
    }

    // util function
    // set new array if type(collection) doesn't exist
    getOrInit(type) {
        if (!this.collections.has(type)) {
            this.collections.set(type, []);
        }
        return this.collections.get(type);
    }
}
