import {Map} from 'lib/map';

export class Reports {

    //static inject() { return [Element]}
    constructor() {
        this.map = new Map();
        // leaflet map config
        this.mapConf = {
            zoomControl: false,
            attributionControl: false,
            minZoom: 5,
            tiles: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
//            tiles: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
        }
    }

    attached() {
        this.map.mapElement = document.querySelector('leafletMap');
    }

}
