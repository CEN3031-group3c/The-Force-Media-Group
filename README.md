# force-media-group

This project can be viewed live at: [https://force-media-group.herokuapp.com/](https://force-media-group.herokuapp.com/)

This project was generated with the [Angular Full-Stack Yeoman Generator](https://github.com/angular-fullstack/generator-angular-fullstack) version 3.5.0

## Getting Started

### Development Environment Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.4.0, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running or have MongoDB run on start up.

4. Run `grunt/gulp serve` to start the development server. It should automatically open the client in your browser when ready.

5. To change the database connections, simply change the process.env variables in you local.env.js file.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

### Adding an API key

First of all we want to add API keys in a particular way to keep them out of our git repo, and thus preventing them from being public. This is very important for the security of our application.

1. Grab the latest `local.env.js` file from the Shared Google Drive folder, and place it at `server/config/local.env.js` (NOTE: this file is gitignore-d.)
2. Add your new desired API key to the credentials file in the Shared Google Drive Folder
3. Now add it to the `local.env.js` file in a way that makes sense (i.e., all caps variable)
4. Now the variable will get added as a server environment variable.
5. If this API key is on the server only, then we are done. Wherever the key is required, we can use process.env.KEY_THAT_WAS_JUST_ADDED_BY_YOU
6. If the client needs this key then we must add it to `/server/config/environment/shared.js` like `YouTubeKey: process.env.YOUTUBE_API_KEY`
7. What this does is at build time (via grunt/gulp serve or build) is take all of the variables here and inject them into the client through the ng-constant gulp/grunt plugin.
8. Now we can use Angular's dependency injection and inject appConfig into the desired controller/service/factory and access the keys directly.
9. Now we need to add the API key to production. Simply log in to Heroku via their web interface and go to the app dashboard. Then go to settings. Then hit reveal config variables. Now add your config variable.
10. Done.

## Testing

Running `npm test` will run the unit tests.

Running `grunt test:e2e` will run the End-to-End tests.

## Deploying

1. Make sure the Heroku toolbelt is installed. [Download here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
2. Run the `heroku login` command (from the project root directory) using the credentials in the credentials google Doc
3. run `grunt build` (from the project root directory)
4. If this is your first time deploying run `yo angular-fullstack:heroku`
5. Otherwise `cd` into the `dist/` folder
6. run `grunt buildcontrol:heroku`
7. If there are no error messages you did it!

## Open Source Software Used

Back-end and development dependencies:

dependencies:
*  babel-polyfill: "^6.7.2"
*  babel-runtime: "^6.6.1"
*  bluebird: "^3.3.3"
*  body-parser: "^1.13.3"
*  composable-middleware: "^0.3.0"
*  compression: "^1.5.2"
*  connect-mongo: "^0.8.1"
*  cookie-parser: "^1.3.5"
*  errorhandler: "^1.4.2"
*  express: "^4.13.3"
*  express-jwt: "^3.0.0"
*  express-session: "^1.11.3"
*  gulp-autoprefixer: "^3.1.0"
*  jade: "^1.11.0"
*  jsonwebtoken: "^5.0.0"
*  karma-script-launcher: "^0.2.0"
*  lodash: "^4.6.1"
*  lusca: "^1.3.0"
*  method-override: "^2.3.5"
*  mongoose: "^4.1.2"
*  morgan: "~1.7.0"
*  nodemailer: "^2.3.0"
*  nodemailer-smtp-transport: "^2.4.1"
*  passport: "~0.3.2"
*  passport-facebook: "^2.1.0"
*  passport-google-oauth20: "^1.0.0"
*  passport-local: "^1.0.0"
*  passport-twitter: "^1.0.4"
*  request: "^2.69.0"
*  serve-favicon: "^2.3.0"
*  shippo: "^1.1.1"
*  stripe: "^4.5.0"
*  xoauth2: "^1.1.0"

devDependencies:
*  autoprefixer: "^6.0.0"
*  babel-core: "^6.6.5"
*  babel-plugin-transform-class-properties: "^6.6.0"
*  babel-plugin-transform-runtime: "^6.6.0"
*  babel-preset-es2015: "^6.6.0"
*  babel-register: "^6.6.5"
*  chai: "^3.2.0"
*  chai-as-promised: "^5.1.0"
*  chai-things: "^0.2.0"
*  connect-livereload: "^0.5.3"
*  del: "^2.0.2"
*  grunt: "~0.4.5"
*  grunt-angular-templates: "^1.0.3"
*  grunt-babel: "~6.0.0"
*  grunt-build-control: "^0.6.0"
*  grunt-concurrent: "^2.0.1"
*  grunt-contrib-clean: "^1.0.0"
*  grunt-contrib-concat: "^1.0.0"
*  grunt-contrib-copy: "^1.0.0"
*  grunt-contrib-cssmin: "^1.0.0"
*  grunt-contrib-imagemin: "^1.0.0"
*  grunt-contrib-jade: "^1.0.0"
*  grunt-contrib-jshint: "^1.0.0"
*  grunt-contrib-sass: "^1.0.0"
*  grunt-contrib-uglify: "^1.0.0"
*  grunt-contrib-watch: "~0.6.1"
*  grunt-dom-munger: "^3.4.0"
*  grunt-env: "~0.4.1"
*  grunt-express-server: "^0.5.1"
*  grunt-filerev: "^2.3.1"
*  grunt-google-cdn: "~0.4.0"
*  grunt-injector: "^0.6.0"
*  grunt-jscs: "^2.1.0"
*  grunt-karma: "~0.12.1"
*  grunt-mocha-istanbul: "^3.0.1"
*  grunt-mocha-test: "~0.12.7"
*  grunt-newer: "^1.1.1"
*  grunt-ng-annotate: "^2.0.1"
*  grunt-ng-constant: "^2.0.1"
*  grunt-node-inspector: "^0.4.1"
*  grunt-nodemon: "^0.4.0"
*  grunt-open: "~0.2.3"
*  grunt-postcss: "~0.8.0"
*  grunt-protractor-runner: "^2.0.0"
*  grunt-usemin: "3.0.0"
*  grunt-wiredep: "^2.0.0"
*  gulp: "^3.9.1"
*  gulp-add-src: "^0.2.0"
*  gulp-angular-templatecache: "^1.7.0"
*  gulp-autoprefixer: "3.0.0"
*  gulp-babel: "^6.1.2"
*  gulp-cache: "^0.4.2"
*  gulp-concat: "^2.6.0"
*  gulp-env: "^0.4.0"
*  gulp-filter: "^4.0.0"
*  gulp-imagemin: "^2.2.1"
*  gulp-inject: "^1.3.1"
*  gulp-istanbul: "~0.10.3"
*  gulp-istanbul-enforcer: "^1.0.3"
*  gulp-jade: "^1.0.1"
*  gulp-jscs: "^3.0.2"
*  gulp-jshint: "^2.0.0"
*  gulp-livereload: "^3.8.0"
*  gulp-load-plugins: "^1.2.0"
*  gulp-minify-css: "^1.1.6"
*  gulp-mocha: "^2.1.3"
*  gulp-ng-annotate: "^2.0.0"
*  gulp-ng-constant: "^1.1.0"
*  gulp-plumber: "^1.0.1"
*  gulp-protractor: "^2.1.0"
*  gulp-rename: "^1.2.2"
*  gulp-rev: "^5.0.0"
*  gulp-rev-replace: "^0.4.2"
*  gulp-sass: "^2.0.1"
*  gulp-scss-lint: "^0.3.9"
*  gulp-sort: "^2.0.0"
*  gulp-sourcemaps: "^1.5.2"
*  gulp-svgmin: "^1.1.2"
*  gulp-uglify: "^1.2.0"
*  gulp-useref: "^3.0.3"
*  gulp-util: "^3.0.5"
*  gulp-watch: "^4.3.5"
*  isparta: "^4.0.0"
*  istanbul: "~0.4.1"
*  jasmine-core: "^2.4.1"
*  jasmine-spec-reporter: "^2.4.0"
*  jit-grunt: "^0.10.0"
*  jshint-stylish: "~2.1.0"
*  karma: "~0.13.19"
*  karma-babel-preprocessor: "^6.0.1"
*  karma-chrome-launcher: "~0.2.0"
*  karma-coverage: "^0.5.5"
*  karma-firefox-launcher: "~0.1.6"
*  karma-jade-preprocessor: "0.0.11"
*  karma-jasmine: "~0.3.6"
*  karma-ng-html2js-preprocessor: "^0.2.0"
*  karma-ng-jade2js-preprocessor: "^0.2.0"
*  karma-ng-scenario: "~0.1.0"
*  karma-phantomjs-launcher: "~1.0.0"
*  karma-requirejs: "~0.2.2"
*  karma-script-launcher: "~0.1.0"
*  karma-sourcemap-loader: "^0.3.7"
*  karma-spec-reporter: "~0.0.20"
*  lazypipe: "^0.2.4"
*  mocha: "^2.2.5"
*  nodemon: "^1.3.7"
*  open: "~0.0.4"
*  phantomjs-prebuilt: "^2.1.4"
*  proxyquire: "^1.0.1"
*  requirejs: "~2.1.11"
*  run-sequence: "^1.1.0"
*  sinon: "^1.16.1"
*  sinon-chai: "^2.8.0"
*  supertest: "^1.1.0"
*  time-grunt: "^1.2.1"
*  utile: "~0.3.0"
*  wiredep: "^2.2.2"

Front-end dependencies:

dependencies:
*  angular: "~1.5.0"
*  json3: "~3.3.1"
*  es5-shim: "~3.0.1"
*  bootstrap-sass-official: "~3.1.1"
*  bootstrap: "~3.1.1"
*  bootstrap-social: "~4.9.1"
*  angular-resource: "~1.5.0"
*  angular-cookies: "~1.5.0"
*  angular-sanitize: "~1.5.0"
*  angular-bootstrap: "~1.1.2"
*  font-awesome: ">=4.1.0"
*  lodash: "^4.3.0"
*  angular-ui-router: "~0.2.15"
*  angular-validation-match: "~1.5.2"
*  angular-input-masks: "^2.1.1"
*  angular-ui-mask: "^1.7.2"
*  AngularJS-Toaster: "angularjs-toaster#^1.2.0"
*  ngModal: "^1.2.2"
*  moment: "^2.12.0"
*  angular-material: "^1.1.0"
*  angular-material-icons: "^0.7.0"

devDependencies:
*  angular-mocks: "~1.5.0"
*  livereload-js: "^2.2.1"

## Features Implemented

1. Landing Page
![Landing Page](https://drive.google.com/uc?id=0B4F_TuIaFV6INV82WkRxV3RLbDA)
2. Bio Page
![Bio Page](https://drive.google.com/uc?id=0B4F_TuIaFV6IREt3VnNsZC1JX0E)
3. Account System
![Signup](https://drive.google.com/uc?id=0B4F_TuIaFV6IQlBDa3pEZ05MTEU)
![Login](https://drive.google.com/uc?id=0B4F_TuIaFV6IQ3I1VEE0V1lCbTA)
![Change Password](https://drive.google.com/uc?id=0B4F_TuIaFV6IV211WC1BT3p5NlU)
4. Integrate with Youtube
[See Landing page above.]
5. Text Message Program (with [EZ texting](https://www.eztexting.com/)) / Text signup form
[See bottom footer of page.]
6. Blogging & ability to comment
![Blog View](https://drive.google.com/uc?id=0B4F_TuIaFV6ISDlJc05ieHhJSmc)
![Comment View](https://drive.google.com/uc?id=0B4F_TuIaFV6IZTBxaVhwTTVCbHc)
7. Booking requests
![Booking Request Form](https://drive.google.com/uc?id=0B4F_TuIaFV6IWWRnbFVqRVhFV2c)
8. Merch Store
![Merch Store](https://drive.google.com/uc?id=0B4F_TuIaFV6IZVB5R2NHOWMxT28)
![Shopping Cart](https://drive.google.com/uc?id=0B4F_TuIaFV6IbGRkdkIzTHBlX1U)
![Checkout](https://drive.google.com/uc?id=0B4F_TuIaFV6IS05qT0wtOEljdk0)
9. Ability for admin to update Pictures and send Text messages
![Admin](https://drive.google.com/uc?id=0B4F_TuIaFV6IY1YzV0dpOWdSM2c)
