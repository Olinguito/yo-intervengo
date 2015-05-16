import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Report} from './models';

@inject(Router, Element)
export default
class ReportDetail {
    report = null;

    constructor(router, ele) {
        this.r = router;
    }

    attached() {
        // TODO find fix
        setTimeout(() => {
            document.querySelector('#report-detail').className = this.report.typeName;
        }, 500);
    }

    activate(params) {
        // get report
        return Report.get(params.slug).then(r=> this.report = r);
    }
}
