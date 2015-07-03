/**
 * De-serialize obcjects(or array of objects) with the right type
 */
export function deserialize(object, Type) {
    var deserialized;
    if (Array.isArray(object)) {
        deserialized = [];
        if (object.length > 0) {
            object.forEach(o => deserialized.push(deserialize(o, Type)));
        }
    } else if (Object.isObject(object)) {
        deserialized = deserializeObj(object);
    } else {
        // object is a primitive.
        // if Type is defined and allows passing arguments create an instance of Type
        deserialized = Type && Type.length > 0 ? new Type(object) : object;
    }
    return deserialized;

    function deserializeObj(obj) {
        // array of serializable properties defined in the model
        var props = Type ? Type.serializable || [] : [],
            deserializedObj,
            // find the type of a property as defined in the model of undefined otherwise
            typeOfProp = prop => {
                var {type} = Array.find(props, p => prop === p.name) || {};
                return type;
            };
        // if model defines its own deserialization strategy
        if (Type && Type.prototype.deserialize === 'function') {
            deserializedObj = obj.deserialize();
        } else { // De-serialize each property in the object recursively
            deserializedObj = Type ? new Type() : {};
            for (let p in obj) {
                deserializedObj[p] = deserialize(obj[p], typeOfProp(p));
            }
        }
        return deserializedObj;
    }
}


/**
 * Serialize objects or arrays
 */
export function serialize(obj) {
    var serialized;
    if (Array.isArray(obj)) {
        serialized = [];
        if (obj.length > 0) {
            obj.forEach(o => serialized.push(serialize(o)));
        }
    } else if (Object.isObject(obj)) {
        serialized = serializeObj(obj);
    } else {
        serialized = obj;
    }
    return serialized;

    function serializeObj(o) {
        var serializedObj = {},
            properties = o.constructor.serializable || [];
        properties = properties.map(p => p.name);
        // class defines its own serialization
        if (typeof o.serialize === 'function') {
            serializedObj = o.serialize();
        } else if (properties.length > 0) {
            // check if object's properties are in 'serializable' list
            properties.forEach(prop => serializedObj[prop] = serialize(o[prop]));
        } else {
            // normal object serialize own properties
            for (let prop in o) {
                if (o.hasOwnProperty(prop)) {
                    serializedObj[prop] = serialize(o[prop]);
                }
            }
        }
        return serializedObj;
    }
}

/**
 * Simple check of an object properties against other
 */
export function intersection(element, query) {
    for (var key in query) {
        let prop = query[key];
        return key in element && element[key] === prop;
    }
    return true;
}

/**
 * Adds an element to an array or updates it if already present
 * @param {Array} array
 * @param {Object} ele Element to insert into the array
 * @param {string} id Name of the field used to compare elments(Default: 'id')
 * @return {integer} index of added/modified element
 */
export function arrayPushOrReplace(array, ele, id = 'id') {
    var i = Array.findIndex(array, e => ele[id] === e[id]);
    if (i >= 0) {
        Object.assign(array[i], ele);
        return i;
    } else {
        return array.push(ele) - 1;
    }
}

/**
 * Get name of the collection that indentifies the 'type'
 * @param {Function} type Constructor function
 * @return {string}
 */
export function getIdentifier(type) {
    var name;
    if (type.resName) {
        name = type.resName.toLowerCase();
    } else if (type.name.length > 2) {
        // constructor is probably not minified
        name = type.name.toLowerCase();
    } else {
        // fallback to the constructor source(works with LocalBackend)
        name = type.toString();
    }
    return name;
}

/**
 * Get plural form of the Type identifier
 * @param {Function} type Constructor function
 */
export function getPluralIdentifier(type) {
    var pluralName, def = getIdentifier(type);
    if (type.resNamePlural) {
        pluralName = type.resNamePlural;
    } else if (!~def.indexOf('{')) {
        // if identifier is not a constructor func
        // add an 's' to the name
        pluralName = `${def}s`;
    } else {
        throw new Error('can\'t get plural form of \'type\'');
    }
    return pluralName;
}


/**
 * Encode object as vaild URL param string
 * @param {Object} object
 */
export function urlParams(object, prefix) {
    var str = [];
    for (var p in object) {
        if (object.hasOwnProperty(p)) {
            var k = prefix ? prefix + '[' + p + ']' : p,
                v = object[p];
            str.push(typeof v === 'object' ?
                urlParams(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
}
