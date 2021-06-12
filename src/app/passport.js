const passport = require('passport');

const Users = require('../api/user/model-');


const localStrategy = require('./passportStrategies/localStrategy')


passport.use(localStrategy);

passport.serializeUser((user, cb) => {
  console.log('serializando');
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  console.log('deserializando');
  Users.findOne({ id: id }, (err, user) => {
    console.log('deserializando', user);
    const userInformation = {
      username: user.username,
    };
    cb(err, userInformation);
  });
});

module.exports = passport;
