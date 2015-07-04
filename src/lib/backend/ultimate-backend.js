import {MemoryBackend} from './memory-backend';
import {LocalBackend} from './local-backend';
import {RemoteBackend} from './remote-backend';
import {Backend} from './base-backend';

/**
 * UltimateBackend
 * Experimental Backend implementation combining memory, localStorage and remote backends
 * keeps resources on memory to make fetching/updating imediate
 * at the same time it makes the apropiate calls to the remote backend
 * and updates the corresponging resources on memory later.
 * Updates to resources from remote API go silent so object observing the returned data is assumed
 */
export class UltimateBackend extends Backend {

    static inject = [MemoryBackend, LocalBackend, RemoteBackend];

    constructor(memoryBE, localBE, remoteBE) {
        super();
        this.memory = memoryBE;
        this.local = localBE;
        this.remote = remoteBE;
        // save collections on localStorage only when app is closed
        window.addEventListener('unload', () => {
            var saveOnLocal = type => ress => this.local.saveAll(type, ress);
            for (let type of this.memory.collections.keys()) {
                this.memory.findSync(type, saveOnLocal(type));
            }
        });
    }

    config(conf) {
        this.remote.config(conf);
    }

    save(resource) {
        return this.remote.save(resource)
            .then(res => this.memory.save(res));
    }

    delete(resource) {
        this.memory.delete(resource);
        this.local.delete(resource);
        return this.remote.delete(resource);
    }

    find(type, query = {}) {
        // send request to server and update memory later
        this.remote.find(type, query).then(rs => this.memory.saveAll(type, rs));
        // resolve quickly with local data
        return this.memory.find(type, query)
            .then(resources => resources.length > 0 ?
                // get from memory
                resources :
                // get from localStorage if memory empty
                this.local.find(type, query).then(rs => this.memory.saveAll(type, rs))
            );
    }

    // findOne(type, query = {}) {
        // this.remote.findOne(type, query);
        // this.memory.findOne(type, query);
    // }

    count(type) {
        return this.remote.count(type);
    }
}
