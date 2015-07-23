import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Report} from './models';

@inject(Router)
export class ReportDetail {
    report = null;

    constructor(router) {
        this.rtr = router;
    }

    attached() {
        // TODO find fix
        setTimeout(() => {
            var view = document.querySelector('#detail');
            view.className = this.report.typeName;
        }, 500);
    }

    activate(params) {
        // get report
        return Report.get(params.slug).then(r=> this.report = r);
    }
}
