// default center for map(Bogotá)
export const defCoords = {
    lat: 4.6476418,
    lng: -74.0552243,
    zoom: 14
};

/**
 *
 */
export class Map {

    constructor(mapEle = null, lat = defCoords.lat, lng = defCoords.lng, zoom = defCoords.zoom) {
        this.mapElement = mapEle;
        this.lat = lat;
        this.lng = lng;
        this.zoom = zoom;
        this.markers = [];
    }

    addMarker(marker) {
        this.markers.push(marker);
    }

    delMarker(idx) {
        this.markers.splice(idx, 1);
    }
}

/**
 *
 */
export class Marker {

    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
