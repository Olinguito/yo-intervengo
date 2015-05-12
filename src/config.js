System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.decorators",
      "es7.classProperties"
    ]
  },
  "paths": {
    "*": "*.js",
    "yi/*": "app/*.js",
    "lib/*": "lib/*.js",
    "github:*": "../vendor/github/*.js",
    "npm:*": "../vendor/npm/*.js",
    "yo-intervengo/*": "app/*.js"
  }
});

System.config({
  "map": {
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.12.0",
    "aurelia-framework": "github:aurelia/framework@0.11.0",
    "aurelia-history-browser": "github:aurelia/history-browser@0.2.5",
    "aurelia-http-client": "github:aurelia/http-client@0.8.0",
    "aurelia-loader-default": "github:aurelia/loader-default@0.5.0",
    "aurelia-router": "github:aurelia/router@0.8.0",
    "aurelia-templating-binding": "github:aurelia/templating-binding@0.9.0",
    "aurelia-templating-resources": "github:aurelia/templating-resources@0.9.2",
    "aurelia-templating-router": "github:aurelia/templating-router@0.10.0",
    "babel": "npm:babel-core@5.2.15",
    "babel-runtime": "npm:babel-runtime@5.2.15",
    "core-js": "npm:core-js@0.9.6",
    "json": "github:systemjs/plugin-json@0.1.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:aurelia/binding@0.4.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5"
    },
    "github:aurelia/binding@0.5.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/binding@0.6.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.5.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.4.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/bootstrapper@0.10.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-framework": "github:aurelia/framework@0.9.0",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-history-browser": "github:aurelia/history-browser@0.2.5",
      "aurelia-loader-default": "github:aurelia/loader-default@0.5.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.2.4",
      "aurelia-router": "github:aurelia/router@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.9.0",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.9.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.9.2",
      "aurelia-templating-router": "github:aurelia/templating-router@0.10.0"
    },
    "github:aurelia/bootstrapper@0.11.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.3.0",
      "aurelia-framework": "github:aurelia/framework@0.10.0",
      "aurelia-history": "github:aurelia/history@0.3.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.3.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.6.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.3.0",
      "aurelia-router": "github:aurelia/router@0.7.2",
      "aurelia-templating": "github:aurelia/templating@0.10.3",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.10.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.10.0",
      "aurelia-templating-router": "github:aurelia/templating-router@0.11.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/bootstrapper@0.12.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.4.0",
      "aurelia-framework": "github:aurelia/framework@0.11.0",
      "aurelia-history": "github:aurelia/history@0.4.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.4.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.7.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.4.0",
      "aurelia-router": "github:aurelia/router@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.11.0",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.11.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.11.0",
      "aurelia-templating-router": "github:aurelia/templating-router@0.12.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/dependency-injection@0.5.1": {
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/dependency-injection@0.6.0": {
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/dependency-injection@0.7.0": {
      "aurelia-logging": "github:aurelia/logging@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.5.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/framework@0.10.0": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-loader": "github:aurelia/loader@0.5.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.3.0",
      "aurelia-templating": "github:aurelia/templating@0.10.3",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/framework@0.11.0": {
      "aurelia-binding": "github:aurelia/binding@0.6.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.7.0",
      "aurelia-loader": "github:aurelia/loader@0.6.0",
      "aurelia-logging": "github:aurelia/logging@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.5.0",
      "aurelia-path": "github:aurelia/path@0.6.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.4.0",
      "aurelia-templating": "github:aurelia/templating@0.11.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/framework@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/history-browser@0.2.5": {
      "aurelia-history": "github:aurelia/history@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/history-browser@0.3.0": {
      "aurelia-history": "github:aurelia/history@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/history-browser@0.4.0": {
      "aurelia-history": "github:aurelia/history@0.4.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/http-client@0.6.1": {
      "aurelia-path": "github:aurelia/path@0.4.6",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/http-client@0.7.0": {
      "aurelia-path": "github:aurelia/path@0.5.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/http-client@0.8.0": {
      "aurelia-path": "github:aurelia/path@0.6.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/loader-default@0.5.0": {
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4"
    },
    "github:aurelia/loader-default@0.6.0": {
      "aurelia-loader": "github:aurelia/loader@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0"
    },
    "github:aurelia/loader-default@0.7.0": {
      "aurelia-loader": "github:aurelia/loader@0.6.0",
      "aurelia-metadata": "github:aurelia/metadata@0.5.0"
    },
    "github:aurelia/loader@0.4.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "core-js": "npm:core-js@0.4.10",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/loader@0.5.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "core-js": "github:zloirock/core-js@0.8.4",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/loader@0.6.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-path": "github:aurelia/path@0.6.0",
      "core-js": "npm:core-js@0.9.6",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.1"
    },
    "github:aurelia/metadata@0.4.0": {
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/metadata@0.5.0": {
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/route-recognizer@0.3.0": {
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/route-recognizer@0.4.0": {
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/router@0.6.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/router@0.7.2": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.3.0",
      "aurelia-history": "github:aurelia/history@0.3.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/router@0.8.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.7.0",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.4.0",
      "aurelia-history": "github:aurelia/history@0.4.0",
      "aurelia-path": "github:aurelia/path@0.6.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.4.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/templating-binding@0.10.0": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-templating": "github:aurelia/templating@0.10.3"
    },
    "github:aurelia/templating-binding@0.11.0": {
      "aurelia-binding": "github:aurelia/binding@0.6.0",
      "aurelia-logging": "github:aurelia/logging@0.4.0",
      "aurelia-templating": "github:aurelia/templating@0.11.0"
    },
    "github:aurelia/templating-binding@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating-resources@0.10.0": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-templating": "github:aurelia/templating@0.10.3",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/templating-resources@0.11.0": {
      "aurelia-binding": "github:aurelia/binding@0.6.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.7.0",
      "aurelia-logging": "github:aurelia/logging@0.4.0",
      "aurelia-templating": "github:aurelia/templating@0.11.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/templating-resources@0.9.2": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-templating": "github:aurelia/templating@0.9.0",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-router@0.10.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-router": "github:aurelia/router@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating-router@0.11.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-router": "github:aurelia/router@0.7.2",
      "aurelia-templating": "github:aurelia/templating@0.10.3"
    },
    "github:aurelia/templating-router@0.12.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.5.0",
      "aurelia-path": "github:aurelia/path@0.6.0",
      "aurelia-router": "github:aurelia/router@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.11.0"
    },
    "github:aurelia/templating@0.10.3": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.5.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/templating@0.11.0": {
      "aurelia-binding": "github:aurelia/binding@0.6.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.7.0",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.6.0",
      "aurelia-logging": "github:aurelia/logging@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.5.0",
      "aurelia-path": "github:aurelia/path@0.6.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.4.0",
      "core-js": "npm:core-js@0.9.6"
    },
    "github:aurelia/templating@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@4.7.16": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.4.10": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

