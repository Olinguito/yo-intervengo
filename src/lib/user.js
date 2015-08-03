import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';

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
            })
            .then(() => this.http.get(`${this.endpoint}/${userId}`))
            .then(res => {
                this.profile = new this.profileType();
                Object.assign(this.profile, res.content);
            })
            .then(() => this.events.publish('user:loggedin', this.profile));
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
