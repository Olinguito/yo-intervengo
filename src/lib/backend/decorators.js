import {Container} from 'aurelia-framework';
import {Backend, RemoteBackend, LocalBackend, MemoryBackend, deserialize} from './backend';

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
        // add API to Class
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
            value(id) { return be.get(klass, id); }
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

/**
 * property decorator
 * Tells the backend what properties are serializable
 */
export function property() {
    var PropType, // {Class} optional type of the property
        propInstances = new WeakMap(); // holds instances with values of properties

    if (arguments.length === 1) {
        PropType = arguments[0];
        return propertyDecorator;
    } else {
        return propertyDecorator.apply(this, arguments);
    }

    function propertyDecorator(target, name, desc) {
        var constructor = target.constructor, propTypeDescriptor;
        // add property to list of serializables
        if (!('serializable' in constructor)) {
            Object.defineProperty(constructor, 'serializable', { value: [] });
        }
        constructor.serializable.push(name);
        // special object descriptor for typed properties
        propTypeDescriptor = {
            enumerable: true,
            configurable: false,
            set(val) {
                privates(this)[name] = typeof val === 'object' && !(val instanceof PropType)
                    // if value is an object convert it to the provided type
                    ? deserialize(val, PropType)
                    : PropType.length > 0
                    // if constructor function accepts argumente pass value to constructor
                    ? new PropType(val)
                    // just assign value in any other case
                    : val;
            },
            get() {
                return privates(this)[name];
            }
        };
        // if no type provided keep the property descriptor the same
        // helps Object.observe to work by not having set/get methods
        return PropType ? propTypeDescriptor : desc;
    }

    function privates(instance) {
        if (!propInstances.has(instance)) {
            propInstances.set(instance, {});
        }
        return propInstances.get(instance);
    }
}
