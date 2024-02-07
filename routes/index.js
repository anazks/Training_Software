var express = require("express"); 
var router = express.Router();
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const bcrypt = require("bcrypt");
require('../Authentication/Passport-config')

router.use(passport.initialize());
router.use(passport.session());

let {
    userLogin,
    userHome,
    errors,
    ResolveError
} = require('../Controller/userController')


router.all("/*", function (req, res, next) {
  req.app.locals.layout = "layouts/layout";
  next();
});

router.get('/',userLogin)
router.get('/home',userHome)

router.post('/login', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  }))
router.post('/ResolveError',ResolveError)
  router.get('/errors',errors)
// router.post('/login',(req,res)=>{
//   console.log(req.body)
// })
  
module.exports = router;

