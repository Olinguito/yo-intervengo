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

    // boot actions
    Promise.all([
        aurelia.start(),
        wait(MIN_WAIT)
    ]).then(r => r[0].setRoot('yi/app'));
}

function wait(seconds) {
    return new Promise(resolve => {
        window.setTimeout(resolve, seconds * 1000);
    });
}
