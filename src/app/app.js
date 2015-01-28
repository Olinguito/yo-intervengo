import {Router} from 'aurelia-router';

export class App {

    static inject() {
        return [Router];
    }

    constructor(router) {
        this.router = router;
        this.router.configure(config => {
            config.title = 'Yo Intervengo';
            config.map([
                {route: ['reports', ''], moduleId: 'yi/reports/reports', nav: true},
                {route: 'wiki', moduleId: 'yi/wiki/wiki', nav: true},
                {route: 'stats', moduleId: 'yi/stats/stats', nav: true},
                {route: 'profile', moduleId: 'yi/profile/profile', nav: true}
            ]);
        });
    }

    getViewStrategy() {
        return '/app/app.html';
    }
}