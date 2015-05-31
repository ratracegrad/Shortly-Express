<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Shortly Express](#shortly-express)
  - [Technology Stack](#technology-stack)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Operation](#operation)
  - [Live Preview](#live-preview)
  - [Screenshot](#screenshot)
  - [Alternative Version](#alternative-version)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Shortly Express

> Demonstraton of using Express server with a Sqlite database to shorten and store URLs. Shortly Express is hosted on a Node Express server.

## Technology Stack
1. Node.js
2. Express
3. Sqlite

## Requirements
- Node.js
- Express
- Sqlite

## Installation
1. Download the repository
2. Install client dependencies with `npm install`
4. Launch Express server with `node shortly.js`
5. Create an account
6. Enter your favorite URLs to shorten

## Operation
First you must create an account. Accounts are stored in a sqlite database.

After creating your account, login. Enter your favorite URL to shorten. Click
the `shorten` button. All URLs that have been shortened can be seen.

## Live Preview
[You can see this repo live here](http://jb-shortly.herokuapp.com/).  The demo is hosted on Heroku.

## Screenshot
Shortly Express login screen
![alt tag](http://jenniferbland.com/Shortly-Express/screenshot-login.png)

Enter URL to be shortened
![alt tag](http://jenniferbland.com/Shortly-Express/screenshot-shorten-url.png)

List of URLs that have been shortened
![alt tag](http://jenniferbland.com/Shortly-Express/screenshot-urls-shortened.png)

## Alternative Version
After creating this version, I rewrote it using AngularJS and a MongoDB database. It still uses a NodeJS server.
[The Angular version is here.](https://github.com/ratracegrad/Shortly)
