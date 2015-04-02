/**
 * Configure and bootstrap aurelia application
 * @param aurelia
 */
export function configure(aurelia) {
    aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .router()
        .eventAggregator();

    aurelia.start().then(a => a.setRoot('yi/app'));
}
