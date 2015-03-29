import {Complain, Request} from './report';
import {Map} from 'lib/map';

export class ReportNew {
    static inject() { return [Map]; }

    constructor(mainMap) {
        this.report = null;
        this.center = mainMap.center;
        this.mapConf = {
            zoomControl: false,
            attributionControl: false,
            minZoom: 12,
            tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        }
    }

    activate(params) {
        this.report = params.type == 'request' ?
            new Request : params.type == 'complain' ?
            new Complain : null;
    }
}
