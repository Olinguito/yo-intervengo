/**
 * Card sorting
 * TODO check if comparisons are correct
 */
export class SortValueConverter {
    toView(reports, sort) {
        if (sort) {
            return reports.sort(this[sort + 'Sort']);
        } else {
            return reports;
        }
    }

    alphaSort(a, b) {
        var title1 = a.title.toLowerCase(), title2 = b.title.toLowerCase();
        if (title1 < title2) {
            return -1;
        }
        if (title1 > title2) {
            return 1;
        }
        return 0;
    }

    locationSort(a, b) {
        // TODO
        return -1;
    }

    supportsSort(a, b) {
        return b.supporters - a.supporters;
    }

    dateSort(a, b) {
        return (a.date.valueOf() < b.date.valueOf()) - (a.date.valueOf() > b.date.valueOf());
    }
}
