const { compareSync } = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const staffModel = require("../models/staffModel");
// var { userLogin} = require('../Controller/UserController')
passport.use(
  new LocalStrategy(function (email, password, done) {
    staffModel.findOne(
      { email: email},
      function (err, user) {
        console.log(err,user)
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("user Name error!");
          return done(null, false);
        }
        if (!compareSync(password, user.Enc_password)) {
          return done(null, false);
        }
        console.log(user, "from passport");
        return done(null, user);
      }
    );
  })
);

//Persists user data inside session
//Persists user data inside session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});
