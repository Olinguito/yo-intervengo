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

    constructor(selector = 'leaflet-map', center = new Coordinates(), zoom = defCoords.zoom) {
        this.center = center;
        this.zoom = zoom;
        this.markers = [];
        this.mapElement = document.querySelector(selector);
        this.ready = new Promise(resolve => {
            if (this.mapElement) {
                resolve(this.mapElement);
            } else { // map not available, watch changes in document until the map is added
                var observer = new MutationObserver(mutations => {
                    for (let mut of mutations) {
                        let mapElement = mut.target.querySelector(selector);
                        // map element available, assign, stop observing and resolve promise
                        if (mapElement !== null) {
                            this.mapElement = mapElement;
                            observer.disconnect();
                            resolve(this.mapElement);
                            break;
                        }
                    }
                });
                observer.observe(document.body, {childList: true, subtree: true});
            }
        });
    }

    setCenter(lat, lng, offset) {
        return this.getCoordsWithOffset(lat, lng, offset)
            .then(coords => this.center.setLatLng(coords.lat, coords.lng));
    }

    setZoom(level, offset) {
        var offsetX = -offset[0] || 0,
            offsetY = -offset[1] || 0;
        return this.getCoordsWithOffset(this.center.lat, this.center.lng, [offsetX, offsetY])
            .then(coords => this.mapElement.map.setZoomAround(coords, level));
    }

    /**
     * get new pair of coordinates after adding an offset in pixels
     */
    getCoordsWithOffset(lat, lng, offset = [0, 0]) {
        return this.ready.then(() => {
            var lfMap = this.mapElement.map,
                {x, y} = lfMap.latLngToContainerPoint([lat, lng]),
                [offsetX, offsetY] = offset;
            return lfMap.containerPointToLatLng([x + offsetX, y + offsetY]);
        });
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
