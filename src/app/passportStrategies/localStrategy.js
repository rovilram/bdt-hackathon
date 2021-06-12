const localStrategy = require('passport-local').Strategy;

const Users = require('../../api/user/model');
const SHA256 = require('crypto-js/sha256');

const strategy = new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    Users.findOne({ username: username }, async (err, user) => {
      const hashPass = SHA256(password).toString();
      if (err) throw err;
      if (!user) return done(null, false);
      if (hashPass === user.password) return done(null, user);
      else return done(null, false);
    });
  },
);


module.exports = strategy;