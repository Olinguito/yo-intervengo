import {valueConverter} from 'aurelia-framework';

/**
 * Simple array filter to search reports by title
 */
@valueConverter('search')
export class SearchFilter {
    toView(data, query) {
        // simple search on name property
        return query ?
            data.filter(report => report.title.toLowerCase().indexOf(query.toLowerCase())>=0)
            : data;
    }
}
