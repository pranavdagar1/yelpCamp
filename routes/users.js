const express=require('express');
const router=express.Router();
const User=require('../models/user');
const catchAsync=require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users=require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync());


router.route('/login')
    .get(users.renderLogin)
    .post(// use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,// passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
    // Now we can use res.locals.returnTo to redirect the user after login,
    users.userLogin);

router.get('/logout', users.userLogout);

module.exports=router;