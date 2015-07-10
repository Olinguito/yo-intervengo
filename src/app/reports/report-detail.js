import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Report} from './models';
import {TILES_URL, MAP_TOKEN} from './reports';
// import {Compiler, compileMarker} from 'lib/util';

@inject(Router)
export class ReportDetail {
    report = null;
    mapConf = {
        zoomControl: false, attributionControl: false, scrollWheelZoom: false,
        tiles: `${TILES_URL}?access_token=${MAP_TOKEN}`
    };

    constructor(router) {
        this.r = router;
    }

    attached() {
        // TODO find fix
        setTimeout(() => {
            var view = document.querySelector('#report-detail');
            view.className = this.report.typeName;
        }, 500);
    }

    activate(params) {
        // get report
        return Report.get(params.slug).then(r=> this.report = r);
    }
}
