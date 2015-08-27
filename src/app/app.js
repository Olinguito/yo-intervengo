import {EventAggregator} from 'aurelia-event-aggregator';
import {User, NotLoggedInError} from 'lib/user';
import {Citizen} from 'yi/shared/models/citizen';

export const CARD_LIST_WIDTH = 296;
export const NAV_WIDTH = 220;
export const NAV_WIDTH_NARROW = 60;

/**
 * Aurelia Application
 */
export class App {
    navOpened = true;

    static inject = [User, EventAggregator];
    constructor(user, events) {
        this.user = user;
        this.user.configure({profileType: Citizen, endpoint: Citizen.resNamePlural});
        // show login dialog when server responds with an unauthorized code
        events.subscribe(NotLoggedInError, () =>{
            var loginDialog = this.login.currentViewModel.dialog;
            if (!loginDialog.hasAttribute('open')) {
                loginDialog.showModal();
            }
        });
    }

    configureRouter(config, router) {
        this.router = router;

        config.title = 'Yo Intervengo';
        config.map([
            // TODO: dynamic generation with i18n
            {name: 'reports', text: 'Reportes', route: 'reports', moduleId: 'yi/reports/reports', nav: true},
            {name: 'wiki', text: 'Wiki', route: 'wiki', moduleId: 'yi/wiki/wiki'},
            {name: 'stats', text: 'Estadisticas', route: 'stats', moduleId: 'yi/stats/stats'},
            {name: 'profile', text: 'Perfil', route: 'profile', moduleId: 'yi/profile/profile'},
            {name: 'about', text: 'Acerca de', route: 'about', moduleId: 'yi/about/about', nav: true},
            // {id: 'login', route: 'login', moduleId: 'yi/login/login'},
            {id: 'error', route: 'error/:error', moduleId: 'yi/error/error'},
            {route: '', redirect: 'reports'}
        ]);
    }

    attached() {
        this.drawer.drawerWidth = NAV_WIDTH + 'px';
        // show beta dialog
        this.betaDialog.showModal();
    }

    toggleNav() {
        this.navOpened = !this.navOpened;
        this.drawer.drawerWidth = this.navOpened ? NAV_WIDTH + 'px' : NAV_WIDTH_NARROW + 'px';
    }

    showLogin() {
         this.login.currentViewModel.dialog.showModal();
    }

    //
    get activeRoute() {
        return this.router.currentInstruction ?
            this.router.currentInstruction.config.name : '';
    }
}
