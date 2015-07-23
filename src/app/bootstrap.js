import {Backend, UltimateBackend} from 'lib/backend/backend';

const API_URL = 'http://api.yointervengo.co/v1';
const API_URL_DEV = 'http://localhost:3000/v1';
// minimum time for the loading animation
const MIN_WAIT = 1; // seconds
var minWait = wait(MIN_WAIT);

/**
 * Configures aurelia application, used by the framework
 * @param aurelia
 */
export function configure(aurelia) {
    var backend, di = aurelia.container;

    // Aurelia default modules
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
        // .plugin('aurelia-animator-css');

    // Make resources global
    aurelia.globalizeResources(
        'yi/elements/icon/yi-icon'
        // 'yi/elements/marker/yi-marker',
        // 'yi/elements/controls/yi-tabs',
        // 'yi/elements/controls/yi-tab'
        );

    // register default backend and configure
    /* global DEV_MODE */
    if (typeof DEV_MODE !== 'undefined') {
        // backend = di.invoke(MemoryBackend);
        backend = di.invoke(UltimateBackend);
        backend.config({baseUrl: API_URL_DEV});
    } else {
        backend = di.invoke(UltimateBackend);
        backend.config({baseUrl: API_URL});
    }
    di.registerInstance(Backend, backend);

    Promise.all([
        aurelia.start(),
        minWait
    ]).then(r => r[0].setRoot('yi/app'));
}

/**
 * Check browser compatibility and run application
 */
function bootstrap() {
    // load webcomponents polyfill only if needed
    // TODO: https://github.com/webcomponents/webcomponentsjs/issues/283
    // var webComp = supportsWC() ? Promise.resolve() : System.import('webcomponentsjs');
    var webComp = Promise.resolve();
    webComp.then(()=> {
        if (browserCompatible()) {
            if (typeof DEV_MODE === 'undefined') {
                loadDocument('bundle.html', {'aurelia-view-bundle': ''});
            }
            // use shadow dom
            window.Polymer = window.Polymer || {};
            window.Polymer.dom = 'shadow';
            loadDocument('polymer-elements.html');
            System.import('aurelia-bootstrapper');
        } else {
            showCompatMessage();
        }
    }).catch(err => {
        console.error(err);
    });
}

function loadDocument(url, attrs = {}) {
    return new Promise((resolve) => {
        var link = document.createElement('link');
        Object.keys(attrs).forEach(name => link.setAttribute(name, attrs[name]));
        link.rel = 'import';
        link.href = url;
        link.addEventListener('load', resolve);
        document.head.appendChild(link);
    });
}

function browserCompatible() {
//    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    return supportsWC() && 'observe' in Object;
}

function showCompatMessage() {
    minWait.then(()=> {
        var compatMessage = document.querySelector('#boot>article'),
            logo = document.querySelector('#logo');
        compatMessage.classList.add('show');
        logo.classList.remove('loading');
    });
}

function wait(seconds) {
    return new Promise(resolve => {
        window.setTimeout(resolve, seconds * 1000);
    });
}

function supportsWC() {
    return 'registerElement' in document
        && 'createShadowRoot' in HTMLElement.prototype
        && 'import' in document.createElement('link');
}

// bootstrap on module load
bootstrap();
