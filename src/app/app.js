import {Router} from 'aurelia-router';
import {BindingLanguage} from 'aurelia-framework';
import cats from 'categories.json!';

//
export const categories = cats;

/**
 * Aurelia Application
 */
export class App {

    static inject() { return [Router, BindingLanguage]; }

    constructor(router, bindingLang) {
        // small fix to be able to bind to 'tileServer' of leaflet-map (browser lowercases it) // TODO: aurelia-fix
        bindingLang.attributeMap['tileserver'] = 'tileServer';
        // config application routes
        this.router = router;
        this.router.configure(config => {
            config.title = 'Yo Intervengo';
            config.map([
                // TODO: module names should start with 'yi' (aurelia fix pending)
                {route: 'reports', moduleId: 'yi/reports/reports', nav: true},
                {route: 'wiki', moduleId: 'yi/wiki/wiki', nav: true},
                {route: 'stats', moduleId: 'yi/stats/stats', nav: true},
                {route: 'profile', moduleId: 'yi/profile/profile', nav: true},
                {route: 'about', moduleId: 'yi/about/about', nav: true},
                {route: 'login', moduleId: 'yi/login/login'},
                {route: '', redirect: '/reports'}
            ]);
        });
    }

    get activeRoute() {
        return this.router.currentInstruction ? this.router.currentInstruction.fragment.split('/')[0] : '';
    }
}
