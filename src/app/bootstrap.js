/**
 * Configure and bootstrap aurelia application
 * @param aurelia
 */
export function configure(aurelia) {
    const MIN_WAIT = 2;

    aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .router()
        .eventAggregator();

    if (compatibleBrowser())
        // boot actions
        Promise.all([
            aurelia.start(),
            wait(MIN_WAIT)
        ]).then(r => r[0].setRoot('yi/app'));
    else
        showCompatMessage();
}

function wait(seconds) {
    return new Promise(resolve => {
        window.setTimeout(resolve, seconds * 1000);
    });
}

function compatibleBrowser() {
    // is chrome
    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}

function showCompatMessage() {
    const WAIT = 1;
    wait(WAIT).then(()=> {
        var compatMessage = document.querySelector('#boot>article'),
            logo = document.querySelector('#logo');
        compatMessage.classList.add('show');
        logo.classList.remove('loading');
    });
}
