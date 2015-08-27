// import {Coords} from 'lib/map';
import {Category} from './category';
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
    @property photo = {};
    @property supporters = [];

    @property location = {lat: 0, lng: 0};
    @property(Category) category;
    @property(Date) date = new Date();
    @property type = reportType.request;

    get typeName() {
        return this.type === reportType.request ? 'request' : 'complain';
    }

    get supportersNum() {
        return Array.isArray(this.supporters) ? this.supporters.length : 0;
    }
}
