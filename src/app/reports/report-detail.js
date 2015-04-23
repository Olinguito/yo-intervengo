import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {BackEnd} from './deleteme-backend';
import {categories} from 'yi/app';

@inject(BackEnd, Router)
export default
class ReportDetail {
    report = {};

    constructor(backend, router) {
        this.bE = backend;
        this.r = router;
    }

    activate(params) {
        // FIXME: replace with api call
        this.report = this.bE.getReports()
            .find( r => r.id === params.name);
        // TODO: urgent! find correct method to do this
        setTimeout(()=> {
            var view = document.querySelector('#report-detail');
            view.className = this.report.typeText;
        }, 500);
    }

}
