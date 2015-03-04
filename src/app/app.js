import {Router} from 'aurelia-router';
import {BindingLanguage} from 'aurelia-framework';

export class App {

    static inject() { return [Router, BindingLanguage]; }

    constructor(router, bindingLang) {
        // small fix to be able to bind to 'tileServer' of leaflet-map (browser lowercases it)
        bindingLang.attributeMap['tileserver'] = 'tileServer';
        // config application routes
        this.router = router;
        this.router.configure(config => {
            config.title = 'Yo Intervengo';
            config.map([
                // TODO: module names should start with 'yi' (aurelia fix pending)
                {route: 'reports', moduleId: 'app/reports/reports', nav: true},
                {route: 'wiki', moduleId: 'app/wiki/wiki', nav: true},
                {route: 'stats', moduleId: 'app/stats/stats', nav: true},
                {route: 'profile', moduleId: 'app/profile/profile', nav: true},
                {route: '', redirect: '/reports'}
            ]);
        });
    }

    get activeRoute() {
        return this.router.currentInstruction ? this.router.currentInstruction.fragment : '';
    }
}