import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {categories} from 'yi/app';

export default
class ReportDetail {

    static inject() { return [HttpClient, Router]; }

    constructor(http, router) {
        this.http = http;
        this.report = {};
        this.r = router;
    }

    activate(params) {
        // FIXME: replace with api call
        return this.http.get('reports.json')
            .then(data => {
                var reports = JSON.parse(data.response) || [];
                this.report = reports.find( cat => cat.slug === params.name);
            });

    }

    get category() {
        return categories[this.report.category[0]];
    }

    get subCategory() {
        return categories[`${this.report.category[0]}.${this.report.category[1]}`];
    }
}
