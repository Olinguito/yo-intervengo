import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Category} from './models';
import {asTree} from 'lib/util';

@inject(Router)
export class ReportMain {
    categories = [];

    constructor(router) {
        this.router = router;
        this.parentVM = this.router.container.viewModel;
    }

    activate() {
        var promises = [], catsPromise;
        catsPromise = Category.find()
        .then(cats => {
            // get parent categories
            cats.forEach(cat => {
                cat._parent = cat.parent;
                if (cat.parent) {
                    promises.push(Category.findOne({slug: cat.parent}).then(c=> cat.parent = c));
                }
            });
            return cats;
        })
        .then(cats => this.categories = asTree(cats, 'slug', 'categories', '_parent'));
        // navigate to route when all promises are resolved
        promises.push(catsPromise);
        return Promise.all(promises);
    }

    /**
     * Callback when yi-selector finishes
     * @param selection array with selected options
     */
    newReport(selection) {
        this.router.navigate(`new/${selection[0].value}/${selection[2].value}`);
    }
}
