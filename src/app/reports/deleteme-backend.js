import reports from 'reports.json!';
import {Request, Complain} from './report';

// TODO replace with real backend
/**
 * Temporal backend service to get reports data
 */
export class BackEnd {
    constructor() {
        this._reports = reports.map(data => {
            return data.type == 0 ? new Request(data) : new Complain(data);
        });
    }

    getReports() {
        return this._reports;
    }
}
