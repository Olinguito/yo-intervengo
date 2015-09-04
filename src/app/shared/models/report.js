// import {Coords} from 'lib/map';
import {Category} from './category';
import {CitizenShort} from './citizen';
import {resource, property} from 'lib/backend/decorators';

export const reportType = { request: 0, complain: 1 };

/**
 * Report Model
 */
@resource
export class Report {
    static resName = 'report';

    @property id;
    @property title = '';
    @property description = '';
    @property address = {};
    @property supporters = {};
    @property location = {lat: 0, lng: 0};
    @property(Picture) pictures = [];
    @property(CitizenShort) creator;
    @property(Category) category;
    @property(Date) date = new Date();
    @property type = reportType.request;

    get typeName() {
        return this.type === reportType.request ? 'request' : 'complain';
    }

    get supportersCount() {
        return this.supporters ? Object.keys(this.supporters).length : 0;
    }

    supported(username) {
        return this.supporters ? !!this.supporters[username] : false;
    }

    owned(username) {
        return this.creator ? this.creator.username === username : false;
    }
}

export class Picture {
    @property url = '';
    @property thumbUrl = this.url;
    @property(Date) date = new Date();
    @property(CitizenShort) author = null;
    @property description = '';
}
