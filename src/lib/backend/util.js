/**
 * De-serialize obcjects(or array of objects) with the right type
 */
export function deserialize(object, Type = Object) {
    var instance;
    if (Array.isArray(object)) {
        let array = object;
        for (let [key, obj] of array.entries()) {
            let newObj = new Type();
            assignProperties(obj, newObj);
            array[key] = newObj;
        }
        instance = array;
    } else {
        instance = new Type();
        assignProperties(object, instance);
    }
    return instance;
}

function assignProperties(form, to) {
    for (let i in form) to[i] = form[i];
}

/**
 * Serialize objects
 */
export function serialize(obj) {
    // TODO: detect serializable properties
    return JSON.parse(JSON.stringify(obj));
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
 */
export function arrayPushOrReplace(array, ele, id = 'id') {
    var i = Array.findIndex(array, e => ele[id] === e[id]);
    if (i >= 0) {
        array[i] = ele;
        return i;
    } else {
        return array.push(ele);
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
export function urlParams(object) {
    return Object.keys(object).map(k => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
    }).join('&');
}
