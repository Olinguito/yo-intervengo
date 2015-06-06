import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Category} from './models';
import {asTree} from 'lib/util';
import {Map} from 'lib/map';
import {Geolocation} from 'lib/geolocation';
import {CARD_LIST_WIDTH} from 'yi/app';

// default zoom level when locating user
const DEF_ZOOM = 15;

@inject(Router, Map, Geolocation)
export class ReportMain {
    categories = [];
    locating = false;

    constructor(router, map, geoloc) {
        // main map
        this.map = map;
        this.loc = geoloc;
        this.router = router;
        this.parentVM = this.router.container.viewModel;
        // locate user on load
        this.centerMapOnUser();
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

    centerMapOnUser() {
        var offset = [CARD_LIST_WIDTH / 2, 0];
        this.locating = true;

        this.loc.getPosition()
        .then(pos => this.map.setCenter(pos.coords.latitude, pos.coords.longitude, offset))
        .then(() => new Promise(res=> setTimeout(res, 500)))
        .then(() => {
            this.locating = false;
            // zoom in if current zoom is lower than default
            if (this.map.zoom < DEF_ZOOM) {
                this.map.setZoom(DEF_ZOOM, offset);
            }
        });
    }

    /**
     * Callback when yi-selector finishes
     * @param selection array with selected options
     */
    newReport(selection) {
        this.router.navigate(`new/${selection[0].value}/${selection[2].value}`);
    }
}
