import {Backend} from './base-backend';
import {arrayPushOrReplace, intersection, getIdentifier, deserialize, serialize} from './util';

/**
 * Persists elements in localstorage, similar to MemoryBackend
 */
export class LocalBackend extends Backend {

    // TODO: save under namespace
    static ns = 'resource';

    storage = window.localStorage;

    save(res) {
        var key = this.getKey(res.constructor),
            resources = this.storage.getItem(key) || 'W10='; // '[]'
        resources = fromString(resources, res.constructor);
        arrayPushOrReplace(resources, res);
        this.storage.setItem(key, asString(resources));
        return Promise.resolve(res);
    }

    delete(res) {
        var key = this.getKey(res.constructor),
            resources = fromString(this.storage.getItem(key), res.constructor) || [];
        var i = Array.findIndex(resources, ele=> asString(ele) === asString(res));
        if (i >= 0) {
            let deleted = resources.splice(i, 1)[0];
            this.storage.setItem(key, asString(resources));
            return Promise.resolve(deleted);
        }
        return Promise.reject('not found');
    }

    find(type, query = {}) {
        var result = this.storage.getItem(this.getKey(type)) || 'W10=';
        result = fromString(result, type);
        result = result.filter(res => intersection(res, query));
        return Promise.resolve(result);
    }

    saveAll(type, ress) {
        var key = this.getKey(type),
            resources = fromString(this.storage.getItem(key), type) || [];
        ress.forEach(ele => arrayPushOrReplace(resources, ele));
        this.storage.setItem(key, asString(resources));
        return Promise.resolve(resources);
    }

    getKey(type) {
        return `${LocalBackend.ns}:${getIdentifier(type)}`;
    }
}


function asString(obj) {
    return btoa(JSON.stringify(serialize(obj)));
}

function fromString(string, type) {
    var jsonString = string ? atob(string) : 'null';
    return deserialize(JSON.parse(jsonString), type);
}
