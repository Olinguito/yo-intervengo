// default center for map(Bogotá)
export const defCoords = {
    lat: 4.6476418,
    lng: -74.0552243,
    zoom: 10
};

export class Coordinates {
    constructor() {
        // several possible scenarios for instantiation
        if (arguments[0] instanceof Coordinates) {
            let coords = arguments[0];
            this.setLatLng(coords.lat, coords.lng);
        } else if (typeof arguments[0] === 'object'
            && arguments[0].constructor === Object) { // plain object
            this.setLatLng(arguments[0].lat, arguments[0].lng);
        } else if (Array.isArray(arguments[0])) {
            this.setLatLng(arguments[0][0], arguments[0][1]);
        } else {
            this.setLatLng(arguments[0], arguments[1]);
        }
    }

    setLatLng(lat, lng) {
        this.lat = lat || defCoords.lat;
        this.lng = lng || defCoords.lng;
    }

    asArray() {
        return [this.lat, this.lng];
    }
}

export var Coords = Coordinates;

/**
 *
 */
export class Map {

    constructor(mapEle = null, center = new Coordinates(), zoom = defCoords.zoom) {
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
    constructor(center = new Coords(), id = ++counter) {
        this.id = id;
        this.coords = center;
    }
}
