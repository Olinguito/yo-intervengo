System.config({
    "paths": {
        "*": "*.js",
        "yi/*": "app/*.js",
        "lib/*": "lib/*.js",
        "github:*": "../vendor/github/*.js",
        "npm:*": "../vendor/npm/*.js"
    }
});

System.config({
    "map": {
        "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.9.5",
        "leaflet": "npm:leaflet@0.7.3",
        "github:aurelia/binding@0.3.7": {
            "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
            "aurelia-metadata": "github:aurelia/metadata@0.3.3",
            "aurelia-task-queue": "github:aurelia/task-queue@0.2.5"
        },
        "github:aurelia/bootstrapper@0.9.5": {
            "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
            "aurelia-framework": "github:aurelia/framework@0.8.8",
            "aurelia-history": "github:aurelia/history@0.2.4",
            "aurelia-history-browser": "github:aurelia/history-browser@0.2.5",
            "aurelia-loader-default": "github:aurelia/loader-default@0.4.3",
            "aurelia-logging-console": "github:aurelia/logging-console@0.2.4",
            "aurelia-router": "github:aurelia/router@0.5.8",
            "aurelia-templating": "github:aurelia/templating@0.8.14",
            "aurelia-templating-binding": "github:aurelia/templating-binding@0.8.7",
            "aurelia-templating-resources": "github:aurelia/templating-resources@0.8.10",
            "aurelia-templating-router": "github:aurelia/templating-router@0.9.4"
        },
        "github:aurelia/dependency-injection@0.4.5": {
            "aurelia-metadata": "github:aurelia/metadata@0.3.3",
            "core-js": "npm:core-js@0.4.10"
        },
        "github:aurelia/framework@0.8.8": {
            "aurelia-binding": "github:aurelia/binding@0.3.7",
            "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
            "aurelia-loader": "github:aurelia/loader@0.3.5",
            "aurelia-logging": "github:aurelia/logging@0.2.5",
            "aurelia-metadata": "github:aurelia/metadata@0.3.3",
            "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
            "aurelia-templating": "github:aurelia/templating@0.8.14"
        },
        "github:aurelia/history-browser@0.2.5": {
            "aurelia-history": "github:aurelia/history@0.2.4",
            "core-js": "npm:core-js@0.4.10"
        },
        "github:aurelia/loader-default@0.4.3": {
            "aurelia-loader": "github:aurelia/loader@0.3.5",
            "aurelia-metadata": "github:aurelia/metadata@0.3.3",
            "aurelia-path": "github:aurelia/path@0.4.5"
        },
        "github:aurelia/loader@0.3.5": {
            "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
            "core-js": "npm:core-js@0.4.10",
            "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
        },
        "github:aurelia/router@0.5.8": {
            "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
            "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
            "aurelia-history": "github:aurelia/history@0.2.4",
            "aurelia-path": "github:aurelia/path@0.4.5",
            "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.2.4",
            "core-js": "npm:core-js@0.4.10"
        },
        "github:aurelia/templating-binding@0.8.7": {
            "aurelia-binding": "github:aurelia/binding@0.3.7",
            "aurelia-templating": "github:aurelia/templating@0.8.14"
        },
        "github:aurelia/templating-resources@0.8.10": {
            "aurelia-binding": "github:aurelia/binding@0.3.7",
            "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
            "aurelia-logging": "github:aurelia/logging@0.2.5",
            "aurelia-templating": "github:aurelia/templating@0.8.14",
            "core-js": "npm:core-js@0.4.10"
        },
        "github:aurelia/templating-router@0.9.4": {
            "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
            "aurelia-metadata": "github:aurelia/metadata@0.3.3",
            "aurelia-path": "github:aurelia/path@0.4.5",
            "aurelia-router": "github:aurelia/router@0.5.8",
            "aurelia-templating": "github:aurelia/templating@0.8.14"
        },
        "github:aurelia/templating@0.8.14": {
            "aurelia-binding": "github:aurelia/binding@0.3.7",
            "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
            "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
            "aurelia-loader": "github:aurelia/loader@0.3.5",
            "aurelia-logging": "github:aurelia/logging@0.2.5",
            "aurelia-metadata": "github:aurelia/metadata@0.3.3",
            "aurelia-path": "github:aurelia/path@0.4.5",
            "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
            "core-js": "npm:core-js@0.4.10"
        },
        "github:jspm/nodelibs-assert@0.1.0": {
            "assert": "npm:assert@1.3.0"
        },
        "github:jspm/nodelibs-buffer@0.1.0": {
            "buffer": "npm:buffer@3.0.1"
        },
        "github:jspm/nodelibs-constants@0.1.0": {
            "constants-browserify": "npm:constants-browserify@0.0.1"
        },
        "github:jspm/nodelibs-crypto@0.1.0": {
            "crypto-browserify": "npm:crypto-browserify@3.9.12"
        },
        "github:jspm/nodelibs-events@0.1.0": {
            "events-browserify": "npm:events-browserify@0.0.1"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.1": {
            "process": "npm:process@0.10.0"
        },
        "github:jspm/nodelibs-stream@0.1.0": {
            "stream-browserify": "npm:stream-browserify@1.0.0"
        },
        "github:jspm/nodelibs-util@0.1.0": {
            "util": "npm:util@0.10.3"
        },
        "github:jspm/nodelibs-vm@0.1.0": {
            "vm-browserify": "npm:vm-browserify@0.0.4"
        },
        "github:jspm/nodelibs-zlib@0.1.0": {
            "browserify-zlib": "npm:browserify-zlib@0.1.4"
        },
        "npm:asn1.js-rfc3280@1.0.0": {
            "asn1.js": "npm:asn1.js@1.0.3"
        },
        "npm:asn1.js@1.0.3": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "bn.js": "npm:bn.js@1.2.4",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "inherits": "npm:inherits@2.0.1",
            "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
            "vm": "github:jspm/nodelibs-vm@0.1.0"
        },
        "npm:assert@1.3.0": {
            "util": "npm:util@0.10.3"
        },
        "npm:browserify-aes@1.0.0": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "create-hash": "npm:create-hash@1.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.1",
            "inherits": "npm:inherits@2.0.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:browserify-rsa@1.1.1": {
            "bn.js": "npm:bn.js@1.2.4",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "constants": "github:jspm/nodelibs-constants@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0"
        },
        "npm:browserify-sign@2.8.0": {
            "bn.js": "npm:bn.js@1.2.4",
            "browserify-rsa": "npm:browserify-rsa@1.1.1",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "elliptic": "npm:elliptic@1.0.1",
            "inherits": "npm:inherits@2.0.1",
            "parse-asn1": "npm:parse-asn1@2.0.0",
            "stream": "github:jspm/nodelibs-stream@0.1.0"
        },
        "npm:browserify-zlib@0.1.4": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "pako": "npm:pako@0.2.5",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "readable-stream": "npm:readable-stream@1.1.13",
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:buffer@3.0.1": {
            "base64-js": "npm:base64-js@0.0.8",
            "ieee754": "npm:ieee754@1.1.4",
            "is-array": "npm:is-array@1.0.1"
        },
        "npm:constants-browserify@0.0.1": {
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:core-js@0.4.10": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:core-util-is@1.0.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0"
        },
        "npm:create-ecdh@1.0.3": {
            "bn.js": "npm:bn.js@1.2.4",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "elliptic": "npm:elliptic@1.0.1"
        },
        "npm:create-hash@1.1.0": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.1",
            "inherits": "npm:inherits@2.0.1",
            "ripemd160": "npm:ripemd160@1.0.0",
            "sha.js": "npm:sha.js@2.3.6",
            "stream": "github:jspm/nodelibs-stream@0.1.0"
        },
        "npm:create-hmac@1.1.3": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "create-hash": "npm:create-hash@1.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "inherits": "npm:inherits@2.0.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0"
        },
        "npm:crypto-browserify@3.9.12": {
            "browserify-aes": "npm:browserify-aes@1.0.0",
            "browserify-sign": "npm:browserify-sign@2.8.0",
            "create-ecdh": "npm:create-ecdh@1.0.3",
            "create-hash": "npm:create-hash@1.1.0",
            "create-hmac": "npm:create-hmac@1.1.3",
            "diffie-hellman": "npm:diffie-hellman@3.0.1",
            "inherits": "npm:inherits@2.0.1",
            "pbkdf2-compat": "npm:pbkdf2-compat@3.0.1",
            "public-encrypt": "npm:public-encrypt@1.1.2",
            "randombytes": "npm:randombytes@2.0.1"
        },
        "npm:diffie-hellman@3.0.1": {
            "bn.js": "npm:bn.js@1.2.4",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "miller-rabin": "npm:miller-rabin@1.1.5",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "randombytes": "npm:randombytes@2.0.1"
        },
        "npm:elliptic@1.0.1": {
            "bn.js": "npm:bn.js@1.2.4",
            "brorand": "npm:brorand@1.0.5",
            "hash.js": "npm:hash.js@1.0.2",
            "inherits": "npm:inherits@2.0.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:events-browserify@0.0.1": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:hash.js@1.0.2": {
            "inherits": "npm:inherits@2.0.1"
        },
        "npm:inherits@2.0.1": {
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:leaflet@0.7.3": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.1",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "util": "github:jspm/nodelibs-util@0.1.0",
            "zlib": "github:jspm/nodelibs-zlib@0.1.0"
        },
        "npm:miller-rabin@1.1.5": {
            "bn.js": "npm:bn.js@1.2.4",
            "brorand": "npm:brorand@1.0.5"
        },
        "npm:pako@0.2.5": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.1",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "util": "github:jspm/nodelibs-util@0.1.0",
            "zlib": "github:jspm/nodelibs-zlib@0.1.0"
        },
        "npm:parse-asn1@2.0.0": {
            "asn1.js": "npm:asn1.js@1.0.3",
            "asn1.js-rfc3280": "npm:asn1.js-rfc3280@1.0.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "pemstrip": "npm:pemstrip@0.0.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:pbkdf2-compat@3.0.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "child_process": "github:jspm/nodelibs-child_process@0.1.0",
            "create-hmac": "npm:create-hmac@1.1.3",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:public-encrypt@1.1.2": {
            "bn.js": "npm:bn.js@1.2.4",
            "browserify-rsa": "npm:browserify-rsa@1.1.1",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "parse-asn1": "npm:parse-asn1@2.0.0"
        },
        "npm:randombytes@2.0.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:readable-stream@1.1.13": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "core-util-is": "npm:core-util-is@1.0.1",
            "events": "github:jspm/nodelibs-events@0.1.0",
            "inherits": "npm:inherits@2.0.1",
            "isarray": "npm:isarray@0.0.1",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "stream": "npm:stream-browserify@1.0.0",
            "string_decoder": "npm:string_decoder@0.10.31",
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:ripemd160@1.0.0": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:sha.js@2.3.6": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.1",
            "inherits": "npm:inherits@2.0.1",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:stream-browserify@1.0.0": {
            "events": "github:jspm/nodelibs-events@0.1.0",
            "inherits": "npm:inherits@2.0.1",
            "readable-stream": "npm:readable-stream@1.1.13"
        },
        "npm:string_decoder@0.10.31": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0"
        },
        "npm:util@0.10.3": {
            "inherits": "npm:inherits@2.0.1",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:vm-browserify@0.0.4": {
            "indexof": "npm:indexof@0.0.1"
        }
    }
});

