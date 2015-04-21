var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  //hasTimestamps: true,
  // defaults: {
  //   visits: 0
  // },
  // clicks: function() {
  //   return this.hasMany(Click);
  // },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('url'));
      // model.set('username', );
      // model.set('password', ;
    });
  }
});

module.exports = User;
