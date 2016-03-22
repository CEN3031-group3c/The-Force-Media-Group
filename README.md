# force-media-group

This project was generated with the [Angular Full-Stack Yeoman Generator](https://github.com/angular-fullstack/generator-angular-fullstack) version 3.5.0

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.4.0, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [Grunt](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt/gulp serve` to start the development server. It should automatically open the client in your browser when ready.

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

Running `npm test` will run the unit tests with karma.

## Deploying

1. Make sure the Heroku toolbelt is installed. [Download here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
2. Run the `heroku login` command (from the project root directory) using the credentials in the credentials google Doc
3. run `grunt build` (from the project root directory)
4. If this is your first time deploying run `yo angular-fullstack:heroku`
5. Otherwise `cd` into the `dist/` folder
6. run `grunt buildcontrol:heroku`
7. If there are no error messages you did it!
