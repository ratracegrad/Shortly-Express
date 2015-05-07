# Shortly Express

Demonstraton of using Express server with a Sqlite database to shorten and store URLs.

Shortly Express is hosted on a Node Express server.

## Operation
First you must create an account. Accounts are stored in a sqlite database.

After creating your account, login. Enter your favorite URL to shorten. Click
the `shorten` button. All URLs that have been shortened can be seen.

## Screenshot
Shortly Express login screen
![alt tag](http://jenniferbland.com/Shortly-Express/screenshot-login.png)

Enter URL to be shortened
![alt tag](http://jenniferbland.com/Shortly-Express/screenshot-shorten-url.png)

List of URLs that have been shortened
![alt tag](http://jenniferbland.com/Shortly-Express/screenshot-urls-shortened.png)

## Live Preview
[You can see this repo live here](http://jb-shortly.herokuapp.com/).  The demo is hosted on Heroku.

## Installation
1. Download the repository
2. Install client dependencies with `npm install`
4. Launch Express server with `node shortly.js`
5. Create an account
6. Enter your favorite URLs to shorten

## Alternative Version
After creating this version, I rewrote it using AngularJS and a MongoDB database. It still uses a NodeJS server.
[The Angular version is here.](https://github.com/ratracegrad/Shortly)
