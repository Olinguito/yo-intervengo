import {Backend} from './base-backend';
import {getPluralIdentifier, urlParams, serialize, deserialize} from './util';
import {HttpClient} from 'aurelia-http-client';

const INVALID_MSG = 'invalid type of resource';
const NON_EXISTENT_MSG = 'can\'t delete non existent element';

/**
 * Persists elements in a remote REST Api
 * performs basic CRUD on resources
 */
export class RemoteBackend extends Backend {

    baseUrl = '';

    static inject = [HttpClient];
    constructor(http) {
        super();
        this.http = http;
        this.config({
            headers: { 'Content-Type': 'application/json' }
        });
    }

    config(conf = {}) {
        // TODO allow more configuration options
        this.http.configure(x => {
            x.withBaseUrl(conf.baseUrl || this.baseUrl);
            if ('headers' in conf) {
                for (var header in conf.headers) {
                    x.withHeader(header, conf.headers[header]);
                }
            }
        });
    }

    save(res) {
        var type = res.constructor;
        if (!isValidResource(type)) {
            return Promise.reject(INVALID_MSG);
        }
        var id = getResId(res),
            endpoint = getPluralIdentifier(type),
        // POST if new or PUT if exsists
            response = id ?
                this.http.put(`${endpoint}/${id}`, serialize(res)) :
                this.http.post(`${endpoint}`, serialize(res));
        return response.then(r => deserialize(r.content, type));
    }

    delete(res) {
        var type = res.constructor;
        if (!isValidResource(type)) {
            return Promise.reject(INVALID_MSG);
        }
        var id = getResId(res),
            endpoint = getPluralIdentifier(type),
            response = id ?
                this.http.delete(`${endpoint}/${id}`) :
                Promise.reject(NON_EXISTENT_MSG);
        return response.then(r => deserialize(r.content, type));
    }

    find(type, query = {}) {
        if (!isValidResource(type)) {
            return Promise.reject(INVALID_MSG);
        }
        var params = Object.keys(query).length > 0 ? '?' + urlParams({filter: {where: query}}) : '',
            endpoint = getPluralIdentifier(type),
            response = this.http.get(`${endpoint}${params}`);
        return response.then(r =>
            deserialize(r.content, type)
            );
    }

    findOne(type, query = {}) {
        if (!isValidResource(type)) {
            return Promise.reject(INVALID_MSG);
        }
        var params = Object.keys(query).length > 0 ? '?' + urlParams({filter: {where: query}}) : '',
            endpoint = getPluralIdentifier(type),
            response = this.http.get(`${endpoint}/findOne${params}`);
        return response.then(r => deserialize(r.content, type));
    }

    get(type, id) {
        if (!isValidResource(type)) {
            return Promise.reject(INVALID_MSG);
        }
        return this.http
            .get(`${getPluralIdentifier(type)}/${id}`)
            .then(r => deserialize(r.content, type));
    }

    count(type) {
        return this.http.get(`${getPluralIdentifier(type)}/count`)
            .then(res => res.content.count);
    }
}

function getResId(res) {
    var idProp = res.constructor.idProperty;
    return idProp ? res[idProp] : res.id;
}

function isValidResource(type) {
    // TODO determine what a valid resource is
    var isValid = true;
    try {
        // throws error when the identifier is not a normal name
        getPluralIdentifier(type);
    } catch (e) {
        isValid = false;
    } finally {
        return isValid;
    }
}
