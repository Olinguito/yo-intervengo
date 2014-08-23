module.exports = (grunt) ->
  path = require 'path'
  pkg = grunt.file.readJSON 'package.json'

  grunt.initConfig
    pkg: pkg
    tmpDir: '.tmp'
    srcDir: 'src'
    outDir: 'out'
    distDir: '<%= outDir %>/dist'
    libDir: '<%= tmpDir %>'

    connect:
      dev:
        options:
          base: ['<%= srcDir %>', '<%= tmpDir %>']
          livereload: yes
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

    concat:
      dist:
        src: [] # injected programaticaly
        dest: '<%= distDir %>/lib.js'

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

    coffee:
      options:
        bare: yes
      dev:
        options:
          sourceMap: yes
          sourceRoot: ''
        expand: yes
        cwd: '<%= srcDir %>'
        src: 'scripts/**/*.coffee'
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
        use: [ require 'nib' ]
        import: [ 'nib' ]
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
        dest: '<%= distDir %>/style.css'

    jade:
      dev:
        options:
        #pretty: true
          data: (dest) ->
            data =
              env: 'dev'
            # send static files list to layout as arrays
            if path.basename(dest, '.html') is 'index'
              data.lib = grunt.file.expand cwd: grunt.config('libDir'), ['**/angular.js', '**/*.js']
              data.css = grunt.file.expand(cwd: grunt.config('tmpDir'), '**/*.css')
              data.js = Array::concat grunt.file.expand(cwd: grunt.config('tmpDir'), ['**/*.js', '!lib/**/*.js']),
                grunt.file.expand(cwd: grunt.config('srcDir'), ['**/*.js'])
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
        files: '<%= srcDir %>/scripts/**/*.coffee'
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
  grunt.loadNpmTasks 'grunt-karma'
  #  grunt.loadNpmTasks 'grunt-bump'

  grunt.registerTask 'prodlib', 'Concat production only libraries', ->
    grunt.log.writeln 'Gathering javascript libraries'
    testLibs = Object.keys grunt.file.readJSON('bower.json').devDependencies
    libDir = grunt.config 'libDir'
    distLibs = grunt.file.expand ["#{libDir}/**/angular.js", "#{libDir}/**/*.js"]
    distLibs = distLibs.filter (file) ->
      path.basename(file, '.js') not in testLibs
    grunt.config 'concat.dist.src', distLibs
    grunt.task.run 'concat:dist'

  grunt.registerTask 'dev', [
    'clean:dev'
    'concurrent:dev'
    'jade:dev'
    'connect:dev'
    'watch'
  ]

  grunt.registerTask 'dist', [
    'clean:dist'
    'copy'
    'concurrent:dist'
    'ngmin'
    'prodlib'
    'uglify'
    'clean:dist2'
  ]

  grunt.registerTask 'test', [
    'karma'
  ]

  grunt.registerTask 'default', [ 'dev' ]
