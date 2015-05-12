import {Backend} from './base-backend';
import {arrayPushOrReplace, intersection} from './util';

var privates = new WeakMap();

/**
 * Persists elements temporarily in memory
 */
export class MemoryBackend extends Backend {

    constructor() {
        super();
        privates.set(this, {collections: new Map()});
    }

    save(res) {
        var collections = privates.get(this).collections;
        if (!collections.has(res.constructor)) {
            collections.set(res.constructor, []);
        }
        arrayPushOrReplace(collections.get(res.constructor), res);
        return Promise.resolve(res);
    }

    delete(res) {
        var resources = privates.get(this).collections.get(res.constructor);
        if (resources && resources.length) {
            let i = resources.indexOf(res);
            if (i >= 0) {
                return Promise.resolve(resources.splice(i, 1)[0]);
            }
        }
        return Promise.reject('not found');
    }

    find(type, query = {}) {
        var result = privates.get(this).collections.get(type) || [];
        result = result.filter(res => intersection(res, query));
        return Promise.resolve(result);
    }
}
