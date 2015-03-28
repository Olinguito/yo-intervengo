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

    constructor(mapEle = null, center = new Coords, zoom = defCoords.zoom) {
        this.mapElement = mapEle;
        this.center = center;
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
var counter = 0;
export class Marker {
    constructor(center = new Coords, id = ++counter) {
        this.id = id;
        this.coords = center;
    }
}

export class Coordinates {
    constructor(lat = defCoords.lat, lng = defCoords.lng) {
        this.lat = lat;
        this.lng = lng;
    }
}

export var Coords = Coordinates;
