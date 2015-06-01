export const PERMISSION_DENIED = 1;
export const POSITION_UNAVAILABLE = 2;
export const TIMEOUT = 3;

export const NOT_SUPPORTED = 4;

/**
 * Geolocation
 * wrapper around browser's native geolocation API
 */
export class Geolocation {
    constructor() {
        this.supported = 'geolocation' in navigator;
    }

    getPosition(opts = {}) {
        return new Promise((res, rej) => {
            if (!this.supported) {
                return rej({code: NOT_SUPPORTED, message: 'geolocation not supported'});
            } else {
                navigator.geolocation
                    .getCurrentPosition(pos => res(pos), err => rej(err), opts);
            }
        });
    }

    watch(opts = {}) {
        return new Promise((res, rej) => {
            if (!this.supported) {
                rej({code: NOT_SUPPORTED, message: 'geolocation not supported'});
            } else {
                navigator.geolocation
                    .watchPosition(pos => res(pos), err => rej(err), opts);
            }
        });
    }
}
