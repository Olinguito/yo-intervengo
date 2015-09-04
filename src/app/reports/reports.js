import {Report} from 'yi/shared/models';

export class Reports {
    // search query property
    query = '';

    configureRouter(config, router) {
        this.$parent = router.parent.container.viewModel;
        // reports sub router
        this.router = router;
        config.map([
            {route: 'new/:type/:category', moduleId: 'yi/reports/report-new', id: 'new', title: ''},
            {route: ':slug', moduleId: 'yi/reports/report-detail', id: 'detail', title: ''},
            {route: '', moduleId: 'yi/reports/report-main', id: 'main', title: ''}
        ]);
    }

    activate() {
        return Report.find().then(reports => this.reports = reports);
    }

    get activeSubSection() {
        return this.router.currentInstruction.config.id || '';
    }
}
