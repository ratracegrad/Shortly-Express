var express = require('express');
var util = require('./lib/utility');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./app/config');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Links = require('./app/collections/links');
var Link = require('./app/models/link');
var Click = require('./app/models/click');
var port = process.env.PORT || 3000;

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


// solution also uses resave and saveUninitialized
app.use(session({secret: '111'}));

var sess;

var loginPage = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

   new User({ username: username, password: password }).fetch().then(function(found){
     if (found) {
       req.session.username = username;
       req.session.password = password;
       res.redirect('/');
     } else {
      res.redirect('/login');
    }
  });
};

var signupPage = function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  new User({ username: username, password: password }).fetch().then(function(found){
    if (found) {
       req.session.username = username;
       req.session.password = password;
      // Henry - to pass tests, I've changed this to redirect to / and added a username and pw
      res.redirect('/');
      //res.redirect('/login');
      // - also found a bug - we need to click 'sign up' twice for it to work
    } else {
      req.session.username = username;
      req.session.password = password;
      var auser = new User({
        username: username,
        password: password
      });

      auser.save().then(function(newUser) {
        Users.add(newUser);
      });

      res.redirect('/');

    }
  })
};

app.get('/', util.checkUser, function(req, res) {
  res.render('index');
});


app.get('/create', util.checkUser, function(req, res) {
    res.render('index');
  });

app.get('/links', util.checkUser, 
function(req, res) {
    Links.reset().fetch().then(function(links) {
      res.send(200, links.models);
    });
});

app.post('/links', 
function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    return res.send(404);
  }

  new Link({ url: uri }).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        link.save().then(function(newLink) {
          Links.add(newLink);
          res.send(200, newLink);
        });
      });
    }
  });
});

/************************************************************/
// Write your authentication routes here
/************************************************************/
app.get('/login',
function(req, res, next) {
  res.render('login');
});

app.post('/login',
function(req, res, next) {
  loginPage(req, res);
});

app.get('/signup',
function(req, res) {
  res.render('signup');
});

app.post('/signup',
function(req, res) {
  signupPage(req, res);
});

app.get('/logout',
function(req, res) {
  req.session.username = undefined;
  res.redirect('/login');
})

/************************************************************/
// Handle the wildcard route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/*', function(req, res) {
  new Link({ code: req.params[0] }).fetch().then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {
      var click = new Click({
        link_id: link.get('id')
      });

      click.save().then(function() {
        db.knex('urls')
          .where('code', '=', link.get('code'))
          .update({
            visits: link.get('visits') + 1,
          }).then(function() {
            return res.redirect(link.get('url'));
          });
      });
    }
  });
});

console.log('Shortly is listening on 4568');
//app.listen(4568);
app.listen(port);