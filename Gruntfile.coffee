module.exports = (grunt) ->
  path = require 'path'
  pkg = grunt.file.readJSON 'package.json'
  verCode = +require('execSync').exec('git tag | wc -l').stdout.trim()

  grunt.initConfig
    pkg: pkg
    tmpDir: '.tmp'
    srcDir: 'src'
    outDir: 'out'
    gapAndroidDir: '<%= outDir %>/app/platforms/android'
    distDir: '<%= outDir %>/dist'
    assetsDir: 'assets'

    connect:
      dev:
        options:
          base: ['<%= srcDir %>', '<%= tmpDir %>']
          livereload: yes
#          keepalive: yes
          hostname: '*'
          port: 8080
          middleware: (connect, options) ->
            modRewrite = require 'connect-modrewrite'
            middlewares = []
            middlewares.push modRewrite(
              ['!\\.html|\\.js|\\.coffee|\\.map|\\.svg|\\.css|\\.png|\\.jpg$ /index.html [L]'])
            options.base = [options.base] if not Array.isArray options.base
            #directory = options.directory or options.base[options.base.length - 1]
            middlewares.push connect.static(base) for base in options.base
            #middlewares.push connect.directory(directory)
            middlewares

    copy:
      js:
        expand: true
        cwd: '<%= srcDir %>'
        src: 'scripts/**/*.js'
        dest: '<%= distDir %>'
      html:
        expand: true
        cwd: '<%= srcDir %>'
        src: 'views/**/*.html'
        dest: '<%= distDir %>'
      assets:
        expand: true
        cwd: '<%= srcDir %>'
        src: '**/*.{json,png,jpg,svg}'
        dest: '<%= distDir %>'
      splash:
        src: '<%= assetsDir %>/splash.9.png'
        dest: '<%= gapAndroidDir %>/res/drawable/splash.9.png'
      icon:
        src: '<%= assetsDir %>/icon.png'
        dest: '<%= gapAndroidDir %>/res/drawable/icon.png'

    concat:
      dist:
        src: [] # injected programaticaly
        dest: '<%= distDir %>/lib.js'
      fixCss:
        src: ['<%= tmpDir %>/lib/**/*.css', '<%= distDir %>/styles/style.css']
        dest: '<%= distDir %>/styles/style.css'

    clean:
      dev:
        src: [
          '<%= tmpDir %>/**/*'
          '!<%= tmpDir %>/lib'
          '!<%= tmpDir %>/lib/**/*'
        ]
      dist:
        src: '<%= distDir %>'
      dist2:
        src: '<%= distDir %>/scripts'
      andDrawable:
        src: '<%= gapAndroidDir %>/res/drawable-*'

    coffee:
      options:
        bare: yes
      dev:
        options:
          sourceMap: yes
          sourceRoot: ''
        expand: yes
        cwd: '<%= srcDir %>'
        src: ['scripts/**/*.coffee', 'lib/**/*.coffee']
        dest: '<%= tmpDir %>'
        ext: '.js'
      dist:
        expand: yes
        cwd: '<%= srcDir %>'
        src: 'scripts/**/*.coffee'
        dest: '<%= distDir %>'
        ext: '.js'

    stylus:
      options:
        use: [require 'nib']
        import: ['nib']
      dev:
        options:
          compress: false
        expand: true
        cwd: '<%= srcDir %>'
        src: 'styles/**/*.styl'
        dest: '<%= tmpDir %>'
        ext: '.css'
      dist:
        src: '<%= srcDir %>/**/*.styl'
        dest: '<%= distDir %>/styles/style.css'

    jade:
      dev:
        options:
        #pretty: true
          data: (dest) ->
            data = env: 'dev'
            # send static files list to layout as arrays
            if path.basename(dest, '.html') is 'index'
              data.lib = grunt.file.expand cwd: grunt.config('tmpDir'), ['lib/**/angular.js', 'lib/**/*.js']
              data.css = grunt.file.expand(cwd: grunt.config('tmpDir'), '**/*.css')
              data.js = grunt.file.expand(cwd: grunt.config('tmpDir'), [ '**/*.js', '!lib/**/*.js' ])
                .concat grunt.file.expand(cwd: grunt.config('srcDir'), ['**/*.js'])
            data
        expand: true
        cwd: '<%= srcDir %>'
        src: ['views/**/*.jade', 'index.jade']
        dest: '<%= tmpDir %>'
        ext: '.html'
      dist:
        expand: true
        cwd: '<%= srcDir %>'
        src: ['views/**/*.jade', 'index.jade']
        dest: '<%= distDir %>'
        ext: '.html'

    watch:
      coffee:
        files: ['<%= srcDir %>/scripts/**/*.coffee', '<%= srcDir %>/lib/**/*.coffee']
        tasks: ['newer:coffee:dev']
      stylus:
        files: '<%= srcDir %>/styles/**/*.styl'
        tasks: ['newer:stylus:dev']
      jade:
        files: ['<%= srcDir %>/views/**/*.jade', '<%= srcDir %>/index.jade']
        tasks: ['newer:jade:dev']
      gruntfile:
        files: ['Gruntfile.*', 'GruntFile.*']
      livereload:
        options:
          livereload: yes
        files: [
          '<%= tmpDir %>/scripts/**/*.js'
          '<%= tmpDir %>/styles/**/*.css'
          '<%= tmpDir %>/views/**/*.html'
          '<%= srcDir %>/scripts/**/*.js'
          '<%= srcDir %>/views/**/*.html'
        ]

    concurrent:
      dev: ['coffee:dev', 'stylus:dev']
      dist: ['coffee:dist', 'stylus:dist', 'jade:dist']

    bower:
      install:
        options:
          cleanup: yes
          targetDir: '<%= libDir %>/lib'
          bowerOptions:
            forceLatest: yes
            production: no
          layout: 'byComponent'

    ngmin:
      dist:
        src: '<%= distDir %>/scripts/**/*.js'
        dest: '<%= distDir %>/app.js'

    uglify:
      dist:
        files:
          '<%= distDir %>/app.js': '<%= distDir %>/app.js'
          '<%= distDir %>/lib.js': '<%= distDir %>/lib.js'
    karma:
      unit:
        configFile: 'test/karma.conf.coffee'
        singleRun: yes

  # PhoneGap
    phonegap:
      config:
        root: '<%= distDir %>'
        path: '<%= outDir %>/app'
        platforms: ['android']
        name: -> pkg.name.replace /[-_]/g, ' '
        config:
          template: 'phonegap_config.xml'
          data:
            pkg: pkg, ver: verCode, name: pkg.name.replace /[-_]/g, ' '
        plugins: [
          'org.apache.cordova.splashscreen'
          'org.apache.cordova.geolocation'
        ]
        minSdkVersion: 14
        targetSdkVersion: 19
        permissions: ['INTERNET', 'ACCESS_COARSE_LOCATION']
        key:
          store: '<%= outDir %>/release-key.keystore'
          alias: 'release'
          aliasPassword: -> 'olinguitolab123'
          storePassword: -> 'olinguitolab123'
        releases: '<%= outDir %>/releases'
        versionCode: verCode

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-concurrent'
  grunt.loadNpmTasks 'grunt-ngmin'
  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-newer'
  grunt.loadNpmTasks 'grunt-phonegap'
  #  grunt.loadNpmTasks 'grunt-karma'
  #  grunt.loadNpmTasks 'grunt-bump'

  grunt.registerTask 'prodlib', 'Concat production only libraries', ->
    grunt.log.writeln 'Gathering javascript libraries'
    tmpDir = grunt.config 'tmpDir'
    distLibs = grunt.file.expand ["#{tmpDir}/lib/**/angular.js", "#{tmpDir}/lib/**/*.js"]
    grunt.config 'concat.dist.src', distLibs
    grunt.task.run 'concat:dist'

  grunt.registerTask 'dev', [
    'clean:dev'
    'concurrent:dev'
    'jade:dev'
    'connect:dev'
    'watch'
  ]

  grunt.registerTask 'phone', [
    'dist'
    'phonegap:build'
    'clean:andDrawable'
    'copy:icon'
    'copy:splash'
    'phonegap:run:android'
  ]

  grunt.registerTask 'release', [
    'dist'
    'phonegap:build'
    'clean:andDrawable'
    'copy:icon'
    'copy:splash'
    'phonegap:release'
  ]

  grunt.registerTask 'dist', [
    'clean:dist'
    'copy'
    'concurrent:dist'
    'ngmin'
    'prodlib'
#    'uglify'
    'concat:fixCss'
    'clean:dist2'
  ]

  grunt.registerTask 'test', [
    'karma'
  ]

  grunt.registerTask 'default', ['dev']
