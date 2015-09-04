import {inject, customElement, useShadowDOM, bindable, computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {addStyleToTemplate} from 'lib/util';
//TODO: import later from the html (aurelia fix pending)
import style from './yi-card.css!text';
import {User} from 'lib/user';

@customElement('yi-card')
@useShadowDOM
@inject(Element, Router, User, HttpClient, EventAggregator)
export class YiCard {
    @bindable report;
    @bindable onSelect = ()=> {};

    constructor(element, router, user, http, events) {
        this.element = element;
        this.router = router;
        this.user = user;
        this.http = http;
        this.events = events;
    }

    @computedFrom('report.pictures.0.url', 'report.pictures.0.thumbnailUrl') // why isn't it working? :'(
    get photoCover() {
        var photo = this.report.pictures[0],
            url = photo ? photo.thumbnailUrl || photo.url : '';
        return { 'background-image': `url(${url})` };
    }

    bind() {
        if (!this.report.id) {
            this.element.classList.add('new');
        }
        // observe id change to remove 'new' class
        // TODO use pollyfill
        Object.observe(this.report, this.onIdChange.bind(this));
        // set manually because computed property is expensive
        this.supportText = supportText(this.report, this.user.profile);
        // reset button text after successful login
        if (!this.user.loggedIn) {
            let disposse = this.events.subscribe('user:loggedin', () => {
                this.supportText = supportText(this.report, this.user.profile);
                disposse();
            });
        }
    }

    onIdChange(changes) {
        for (let change of changes) {
            if (change.name === 'id' && change.object.id) {
                this.element.classList.remove('new');
            }
        }
    }

    // when header is clicked open detail view
    openDetail() {
        if (this.report.id) {
            this.router.navigate(this.report.id);
        }
    }

    support() {
        if (this.user.loggedIn) {
            // modify locally for quick feedback
            if (!this.report.supporters) {
                this.report.supporters = {};
            }
            this.report.supporters[this.user.profile.username] = true;
            this.supportText = supportText(this.report, this.user.profile);
        }
        // hit API, no need for loggin check since API responds with 401 opening login dialog
        // TODO make part of lib/backend?
        this.http.post(`reports/${this.report.id}/support`);
    }

    @computedFrom('supportText')
    get supportBtnDisabled() {
        return this.supportText === 'Respaldar' ? false : true;
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}

function supportText(report, user) {
    if (user) {
        return report.supported(user.username)
            ? 'Respaldado'
            : report.owned(user.username) ? 'Mi reporte' : 'Respaldar';
    } else {
        return 'Respaldar';
    }
}
