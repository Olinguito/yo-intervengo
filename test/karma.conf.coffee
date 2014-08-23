module.exports = (config) ->
  config.set
    basePath: '..'
    frameworks: ['mocha']
    browsers: ['PhantomJS']
    files: [
      '.tmp/lib/chai/chai.js'
      '.tmp/lib/angular/angular.js'
      '.tmp/lib/angular-mocks/angular-mocks.js'
      'src/**/*.{coffee,js}'
      'test/**/*.{coffee,js}'
    ]