import {inject} from 'aurelia-framework';
import {Geolocation} from 'lib/geolocation';

export const MAP_ACCESS_TOKEN = 'pk.eyJ1Ijoib2xhbm9kIiwiYSI6IjdZdV9iTTQifQ.HP-razZKsNmITPgHs4ugIA';
export const MAP_STYLE = 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json';
const DEF_ZOOM = 15;

/**
 * Holds map state and configuration
 */
@inject(Geolocation)
export default
class Map {
    config = { token: MAP_ACCESS_TOKEN, style: MAP_STYLE, minZoom: 5, maxZoom: 16 };
    lat = 0;
    lng = 0;
    zoom = 10;
    locating = false;

    constructor(geoLocation) {
        this.geoLoc = geoLocation;
    }

    setCenter(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }

    center(center, zoom) {
        var defZoom = this.zoom < DEF_ZOOM ? DEF_ZOOM : this.zoom;
        if (center) {
            // center on provided location
            this.lat = center[0];
            this.lng = center[1];
            return Promise.resolve({lat: this.lat, lng: this.lng, zoom: this.zoom});
        } else {
            // center on user location
            this.locating = true;
            return this.geoLoc.getPosition()
                .then(pos => {
                    this.lat = pos.coords.latitude;
                    this.lng = pos.coords.longitude;
                })
                .then(() => {
                    this.zoom = zoom || defZoom;
                })
                .then(() => this.locating = false)
                .catch(() => this.locating = false)
                .then(() => { return {lat: this.lat, lng: this.lng, zoom: this.zoom}; });
        }
    }
}
