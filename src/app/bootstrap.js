// minimum time for the loading animation
const MIN_WAIT = 2.5; // seconds
var minWait = wait(MIN_WAIT);
// bootstrap on module load
bootstrap();

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
            loadDocument('polymer-elements.html');
            System.import('aurelia-bootstrapper');
        } else showCompatMessage();
    }).catch(err => {
        console.error(err);
    });
}

/**
 * Configures aurelia application, used by the framework
 * @param aurelia
 */
export function configure(aurelia) {

    aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .router()
        .eventAggregator();

    Promise.all([
        aurelia.start(),
        minWait
    ]).then(r => r[0].setRoot('yi/app'));
}

function loadDocument(url) {
    return new Promise((resolve) => {
        var link = document.createElement('link');
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

