import {Router} from 'aurelia-router';
import {inject, BindingLanguage} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

export const CARD_LIST_WIDTH = 296;
export const NAV_WIDTH = 220;
export const NAV_WIDTH_NARROW = 60;

/**
 * Aurelia Application
 */
@inject(BindingLanguage, HttpClient)
export class App {

    navOpened = true;
    navWidth = NAV_WIDTH + 'px';

    constructor(bindingLang, http) {
        this.http = http;
        // small fix to be able to bind to 'tileServer' of leaflet-map (browser lowercases it) // TODO: aurelia-fix
        bindingLang.attributeMap.tileserver = 'tileServer';
        bindingLang.attributeMap.drawerwidth = 'drawerWidth';
    }

    configureRouter(config, router) {
        this.router = router;

        config.title = 'Yo Intervengo';
        config.map([
            // TODO: dynamic generation with i18n
            {name: 'Reportes', id: 'reports', route: 'reports', moduleId: 'yi/reports/reports', nav: true},
            {name: 'Wiki', id: 'wiki', route: 'wiki', moduleId: 'yi/wiki/wiki'},
            {name: 'Estadisticas', id: 'stats', route: 'stats', moduleId: 'yi/stats/stats'},
            {name: 'Perfil', id: 'profile', route: 'profile', moduleId: 'yi/profile/profile'},
            {name: 'Acerca de', id: 'about', route: 'about', moduleId: 'yi/about/about', nav: true},
            {id: 'login', route: 'login', moduleId: 'yi/login/login'},
            {id: 'error', route: 'error/:error', moduleId: 'yi/error/error'},
            {route: '', redirect: 'reports'}
        ]);
    }

    attached() {
        // show beta dialog
        this.beta = document.querySelector('body > dialog');
        this.beta.showModal();
    }

    toggleNav() {
        this.navOpened = !this.navOpened;
        this.navWidth = this.navOpened ? NAV_WIDTH + 'px' : NAV_WIDTH_NARROW + 'px';
    }

    //
    get activeRoute() {
        return this.router.currentInstruction ?
            this.router.currentInstruction.config.id : '';
    }
}
