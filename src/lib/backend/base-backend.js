/**
 * Base abstract class for Backend implementations
 */
export class Backend {
    save(resource) { throw new Error('Must implement \'save\' method'); }

    delete(resource) { throw new Error('Must implement \'delete\' method'); }

    find(type, query = {}) { throw new Error('Must implement \'find\' method'); }

    get(type, id) {
        return this.findOne(type, {id});
    }

    findOne(type, query = {}) {
        return this.find(type, query)
            .then(data => data.length > 0 ? data[0] : Promise.reject('not found'));
    }
}
