import {Complain, Request} from './report';

export class ReportNew {
    static inject() { return []; }

    constructor() {
        this.report = null;
    }

    activate(params) {
        this.report = params.type == 'request' ?
            new Request :
                params.type == 'complain' ?
            new Complain : null;
    }
}
