import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';

const STORAGE_KEY = 'user:token';

/**
 * User
 * Aurelia service for managing user authentication
 */
export class User {
    profile = null;
    profileType = Object;
    endpoint = 'user';
    id = 'username';

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
        var data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            let [id, token] = data.split(':');
            this.credential = token;
            this.getProfile(id);
        }
    }

    register(data) {
        return this.http.post(this.endpoint, data);
    }

    login(unameEmail, pass) {
        var userId;
        var data = {
            [this.id]: unameEmail,
            password: pass
        };

        return this.http.post(`${this.endpoint}/login`, data)
            .then(res => {
                this.credential = res.content.id;
                userId = res.content.userId;
                // save on storage
                localStorage.setItem(STORAGE_KEY, [userId, this.credential].join(':'));
            })
            .then(() => this.getProfile(userId))
            .then(() => this.events.publish('user:loggedin', this.profile));
    }

    getProfile(id) {
        return this.http.get(`${this.endpoint}/${id}`)
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
            x.withHeader('Authorization', value)
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
