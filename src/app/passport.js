const passport = require('passport');

const Users = require('../api/user/model');


const localStrategy = require('./passportStrategies/localStrategy')


passport.use(localStrategy);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  Users.findOne({ id: id }, (err, user) => {
    const userInformation = {
      username: user.username,
    };
    cb(err, userInformation);
  });
});

module.exports = passport;
