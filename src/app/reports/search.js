import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

// TODO: remove and get from backend
var categories = [
    {
        name: 'new request',
        slug: 'request',
        categories: [
            {name: 'mobility', slug: 'mobility', categories: [
                {name: 'crossing', slug: 'crossing'},
                {name: 'road', slug: 'road'}
            ]},
            {name: 'buildings', slug: 'buildings', categories: [
                {name: 'bridge', slug: 'bridge'}
            ]},
            {name: 'security', slug: 'security', categories: [
                {name: 'policemen', slug: 'policemen'}
            ]},
            {name: 'public services', slug: 'pub-services', categories: [
                {name: 'water', slug: 'water'},
                {name: 'electricity', slug: 'electricity'},
                {name: 'internet', slug: 'internet'}
            ]},
            {name: 'environment', slug: 'environment', categories: [
                {name: 'trash can', slug: 'trash-can'}
            ]},
            {name: 'other', slug: 'other', categories: [
                {name: 'new event', slug: 'event'}
            ]}
        ]
    },
    {
        name: 'new complain',
        slug: 'complain',
        categories: [
            {name: 'mobility', slug: 'mobility', categories: [
                {name: 'hole', slug: 'hole'},
                {name: 'crossing', slug: 'crossing'}
            ]},
            {name: 'buildings', slug: 'buildings', categories: [
                {name: 'stadium', slug: 'stadium'}
            ]},
            {name: 'security', slug: 'security', categories: [
                {name: 'dangerous zone', slug: 'dangerous-zone'},
                {name: 'gangs', slug: 'gangs'}
            ]},
            {name: 'public services', slug: 'pub-services', categories: [
                {name: 'water leak', slug: 'water-leak'}
            ]},
            {name: 'environment', slug: 'environment', categories: [
                {name: 'polution', slug: 'polution'}
            ]},
            {name: 'other', slug: 'other', categories: [
                {name: 'noise', slug: 'noise'}
            ]}
        ]
    }
];

@inject(Router)
export class Search {


    constructor(router) {
        this.cats = categories;
        this.r = router;
    }

    /**
     * Callback when yi-selector finishes
     * @param selection array with selected options
     */
    newReport(selection) {
        this.r.parent.navigate(`new/${selection.map(ele=>ele.value).join('/')}`);
    }

}
