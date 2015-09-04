import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Report} from 'yi/shared/models';
import {asTree} from 'lib/util';
import {User} from 'lib/user';
import Map from './map';

var storedLocation;

@inject(Router, Map, User, EventAggregator, HttpClient)
export class ReportMain {
    categories = [];
    // referenced on view
    mapElement;

    constructor(router, map, user, eventAggregator, http) {
        this.router = router;
        this.$parent = this.router.container.viewModel;
        this.map = map;
        this.user = user;
        this.events = eventAggregator;
        this.http = http;
    }

    attached() {
        // use previous location if user has been located before
        if (storedLocation) {
            this.mapElement.setCenter([storedLocation.lat, storedLocation.lng]);
            this.mapElement.setZoom(storedLocation.zoom);
        } else {
            this.map.center().then(center => storedLocation = center);
        }
    }

    activate() {
        Report.find().then(rr => this.reports = rr);
        // TODO use backend
        return this.http.get("/categories").then(res => this.categories = res.content);
    }

    deactivate() {
        // save location to place map where user was last time
        storedLocation = {lat: this.map.lat, lng: this.map.lng, zoom: this.map.zoom};
    }

    /**
     * Callback when yi-selector finishes
     * @param selection array with selected options
     */
    newReport(selection) {
        var type = selection[0].value,
            cat = selection[selection.length-1].value;
        if (this.user.isLoggedIn) {
            this.router.navigate(`new/${type}/${cat}`);
        } else {
            this.$parent.$parent.login.currentViewModel.dialog.showModal();
            let disposse = this.events.subscribe('user:loggedin', () => {
                this.router.navigate(`new/${type}/${cat}`)
                disposse();
            });
        }
    }
}
