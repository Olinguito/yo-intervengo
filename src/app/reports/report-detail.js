import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Report} from './models';
import Map from './map';

@inject(Router, Map)
export class ReportDetail {
    report = null;
    // map element
    map = null;

    constructor(router, map) {
        this.router = router;
        this.mainMap = map;
    }

    attached() {
        // set map center without animation
        this.map.setCenter([this.report.location.lat, this.report.location.lng]);
        // highlight card
        this.router.container.viewModel //parent viewModel
            .list.yiCardList.highlight(this.report);
        // TODO find fix
        setTimeout(() => {
            var view = document.querySelector('#detail');
            view.className = this.report.typeName;
        }, 500);
    }

    activate(params) {
        return Report.get(params.slug).then(r => this.report = r);
    }

    close() {
        this.router.navigateToRoute('reports');
    }
}
