const { Router } = require("express");
let express = require("express");
let router = express.Router();

//controllers
const {getLoginPage,
  homepage,
  doLogin,
  getStaffpage,
  addStaffPage,
  errorpage,
  addError,
  Report,
  logout,
  addStaff,
  addErrorToDb,
  deleteError,
  deleteStaff
} = require('../Controller/adminController')

//middlewares
router.all("*", function (req, res, next) {
  req.app.locals.layout = "layouts/admin-layout"; // set your layout here
  next(); // pass control to the next handler
});
//middleware for checking whether user is logged in
const verifyLogin = (req, res, next) => {
  if (req.session.admin|| req.session.staff) {
    next();
  } else {
    return res.redirect("/admin/login");
  }
};


router.get('/',getLoginPage)
router.get('/home',verifyLogin,homepage)
router.get('/getStaffPage',verifyLogin,getStaffpage)
router.get("/add-new-staff",verifyLogin,addStaffPage)
router.get("/getError",verifyLogin,errorpage)
router.get('/addError',verifyLogin,addError)
router.get('/Report',verifyLogin,Report)
router.get('/logout',logout)

router.post('/login',doLogin)
router.post('/add-Staff',addStaff)
router.post('/addError',verifyLogin,addErrorToDb)

router.get("/delete-staff/:id",verifyLogin,deleteStaff);
router.get("/delete-error/:id",verifyLogin,deleteError)



module.exports = router;
