import {Container} from 'aurelia-framework';
import {Backend, RemoteBackend, LocalBackend, MemoryBackend} from './backend';

const allowedBackends = [RemoteBackend, LocalBackend, MemoryBackend];

/**
 * resource decorator
 * Decorate model classes for easy persistance in one the possible backends
 * @param  {Backend} backend  One of the allowed backend subclasses
 */
export function resource(backend) {
    var container = getAureliaContainer(); // use aurelia DI

    // register allowed backends if not present in the container
    for (let allowedBE of allowedBackends) {
        if (!container.hasHandler(allowedBE)) {
            container.registerSingleton(Backend, allowedBE);
        }
    }

    // when decorator invoked with no arguments
    if (allowedBackends.indexOf(backend) === -1) {
        let type = backend;
        backend = null;
        return resourceDecorator(type);
    } else {
        return resourceDecorator;
    }

    function resourceDecorator(type) {
        var backendInstance = backend ?
            container.get(backend) : // supplied backend
            container.get(Backend); // default backend
        attachBackendMethods(type, backendInstance);
    }

    // extend resource class/instances with the backend API
    function attachBackendMethods(klass, be) {
        // static non enumerable methods
        Object.defineProperty(klass, 'find', {
            value(query) { return be.find(klass, query); }
        });
        Object.defineProperty(klass, 'findOne', {
            value(query) { return be.findOne(klass, query); }
        });
        Object.defineProperty(klass, 'get', {
            value(id) { return be.find(klass, id); }
        });
        // instance non enumerable methods
        Object.defineProperty(klass.prototype, 'save', {
            value() { return be.save(this); }
        });
        Object.defineProperty(klass.prototype, 'delete', {
            value() { return be.delete(this); }
        });
    }
}

function getAureliaContainer() {
    var element = document.querySelector('[aurelia-app]');
    return element ? element.aurelia.container : new Container();
}
