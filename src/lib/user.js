import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';

const STORAGE_KEY = 'user:token';
const CLIENT_ID_SECRET = 'NWU1ZDVlNTViNWM3MGY5NjNjMzAyNWM1Yzg2ZjRjYWI5YzMyMDA5NjpmOTFhZDhiNzVmMWEwNTczMTdkNzliYmYxYWRlNjZjZmU3ZjY5ZDNk';

/**
 * User
 * Aurelia service for managing user authentication
 */
export class User {
    profile = null;
    profileType = Object;
    endpoint = 'user';

    static inject = [HttpClient, EventAggregator];

    constructor(http, eventAggregator) {
        this.http = http;
        this.events = eventAggregator;

        this.http.configure(x =>
            x.withInterceptor(new AuthErrorInterceptor(this.events))
        );
    }

    configure(config) {
        Object.assign(this, config);
        // get profile if credentials exist and after configuring
        var token = localStorage.getItem(STORAGE_KEY);
        if (token) {
            this.credential = token;
            this.getProfile();
        }
    }

    register(data) {
        return this.http.post(this.endpoint, data);
    }

    login(uname, pass) {
        var userId;
        var data = {
            'grant_type': 'password',
            'username': uname,
            'password': pass
        };

        return this.http.createRequest(`${this.endpoint}/login`)
            .asPost()
            .withHeader('Authorization', `Basic ${CLIENT_ID_SECRET}`)
            .withHeader('Content-Type', 'application/x-www-form-urlencoded')
            .withHeader('Accept', 'application/json')
            .withContent(encodeData(data))
            .send()
            .then(res => {
                this.credential = res.content['access_token'];
                // TODO handle refresh token
                // save on storage
                localStorage.setItem(STORAGE_KEY, this.credential);
            })
            .then(() => this.getProfile())
            .then(() => this.events.publish('user:loggedin', this.profile));
    }

    getProfile() {
        return this.http.get(`${this.endpoint}/me`)
            .then(res => {
                this.profile = new this.profileType();
                Object.assign(this.profile, res.content);
                return this.profile;
            });
    }

    logout() {
        return this.http.post(`${this.endpoint}/logout`);
    }

    get isLoggedIn() {
        return !!this.profile;
    }

    set credential(value) {
        this.http.configure(x =>
            x.withHeader('Authorization', `Bearer ${value}`)
        );
        Object.defineProperty(this, '_token', {value});
    }

    get credential() {
        return this._token;
    }
}

/**
 *
 */
class AuthErrorInterceptor {
    constructor(eAggregator) {
        this.events = eAggregator;
    }

    response(message) {
        return message;
    }

    responseError(error) {
        if (error.statusCode === 401) {
            var token = localStorage.getItem(STORAGE_KEY);
            if (token) {
                localStorage.removeItem(STORAGE_KEY);
            }
            this.events.publish(new NotLoggedInError());
        } else if (error.statusCode === 403) {
            this.events.publish(new ForbiddenError());
        }
        throw error;
    }
}

export class AuthError {}
export class NotLoggedInError extends AuthError {}
export class ForbiddenError extends AuthError {}


/**
 * util formurl encode
 */
function encodeData(data) {
    var result = '';
    for (let i in data) {
        let part = `${i}=${encodeURIComponent(data[i])}`;
        result += result.length === 0 ? part : '&' + part;
    }
    return result;
}
