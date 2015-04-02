import {Router} from 'aurelia-router';
import {BackEnd} from './deleteme-backend';
import {categories} from 'yi/app';

export default
class ReportDetail {

    static inject() { return [BackEnd, Router]; }

    constructor(backend, router) {
        this.bE = backend;
        this.report = {};
        this.r = router;
    }

    activate(params) {
        // FIXME: replace with api call
        this.report = this.bE.getReports()
            .find( r => r.id === params.name);
        // TODO: urgent! find correct method to do this
        setTimeout(()=>{
            var view = document.querySelector('#report-detail');
            view.className = this.report.typeText;
        }, 500);
    }

}
