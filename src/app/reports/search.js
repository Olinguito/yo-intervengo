import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';

@inject(Router, HttpClient)
export class Search {
    categories = [];

    constructor(router, http) {
        this.http = http;
        this.router = router;
        this.parentVM = this.router.container.viewModel;
    }

    activate() {
        return this.http.get('categories.json')
            .then(data => this.categories = data.content);
    }

    /**
     * Callback when yi-selector finishes
     * @param selection array with selected options
     */
    newReport(selection) {
        this.router.navigate(`new/${selection.map(ele=>ele.value).join('/')}`);
    }
}
