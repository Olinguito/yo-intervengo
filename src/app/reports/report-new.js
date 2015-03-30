import {Complain, Request, Category} from './report';
import {Map} from 'lib/map';

export class ReportNew {
    static inject() { return [Element, Map]; }

    constructor(ele, mainMap) {
        this.element = ele;
        this.report = null;
        this.center = mainMap.center;
        this.mapConf = {
            zoomControl: false,
            attributionControl: false,
            minZoom: 12,
            tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        }
    }

    photoSelected(file) {
        var reader = new FileReader(),
            img = this.element.querySelector(':scope .photo figure');
        reader.onload = () => { img.style.backgroundImage = `url(${reader.result})` };
        reader.readAsDataURL(file);
    }

    activate(params) {
        var {type, category, subCategory} = params;
        this.report = type === 'request' ?
            new Request : type === 'complain' ?
            new Complain : null;
        // TODO: change wen backend implemented
        this.report.category = new Category([category,subCategory]);
    }
}
