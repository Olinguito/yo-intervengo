var _privates = new WeakMap();

/**
 * Base abstract class for Backend implementations
 */
export class Backend {
    save(resource) { throw new Error("Must implement 'save' method"); }

    delete(resource) { throw new Error("Must implement 'delete' method"); }

    find(type, query = {}) { throw new Error("Must implement 'find' method"); }

    get(type, id) {
        return this.findOne(type, {id});
    }

    findOne(type, query = {}) {
        return this.find(type, query)
            .then(data => data.length ? data[1] : Promise.reject('not found'));
    }
}

/**
 * Persists elements temporarily in memory
 */
export class MemoryBackend extends Backend {

    constructor() {
        super();
        _privates.set(this, {collections: new Map()});
    }

    save(res) {
        var collections = _privates.get(this).collections;
        if (!collections.has(res.constructor))
            collections.set(res.constructor, []);
        collections.get(res.constructor).push(res);
        return Promise.resolve(res);
    }

    delete(res) {
        var resources = _privates.get(this).collections.get(res.constructor);
        if (resources && resources.length) {
            let i = resources.indexOf(res);
            if (i >= 0) return Promise.resolve(resources.splice(i, 1)[0]);
        }
        return Promise.reject('not found');
    }

    find(type, query = {}) {
        var result = _privates.get(this).collections.get(type) || [];
        result = result.filter(res => intersection(res, query));
        return Promise.resolve(result);
    }
}

/**
 * Persists elements in localstorage
 */
class LocalBackend extends Backend {
}

/**
 * Persists elements in localstorage
 */
class RemoteBackend extends Backend {
}

/**
 * Persists elements in localstorage
 */
class MixedBackend extends Backend {
}

function serialize() {

}

/**
 * Simple check of an object properties against other
 */
function intersection(element, query) {
    for (var key in query) {
        let prop = query[key];
        return key in element && element[key] === prop;
    }
    return true;
}
