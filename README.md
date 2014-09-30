Yo Intervengo
=============
Application that allows citizens to make complains, requests and keep track of public works.  

![yo intervengo main screen](http://yointervengo.olinguito.com.co/assets/img/cell1.png)

Install
-------
1. Make sure you have `nodejs` installed
2. Run `npm install`
3. Make sure you have `grunt-cli` installed globally
4. Run `grunt bower`
5. Enjoy!

#### 5.1 Start development Server
Run `grunt`, it will start a local server in port 8080
#### 5.2 Compile and run in phone/emulator
Run `grunt phone`, it will compile, minify, etc. assets, build phonegap project and install the app in the android phone/emulator
#### 5.3 Create release ready Apk
Run `grunt release`, it will generate a signed apk in the `out/releases` folder
#### 5.4 Run Tests
Run `grunt test`, TODO: Tests are missing XD