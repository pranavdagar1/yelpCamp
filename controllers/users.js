const User=require('../models/user');

module.exports.renderRegister=(req,res)=>{
    res.render('users/register')
}
module.exports.userRegister=async(req,res)=>{
    try{const{email,username,password}=req.body;
    const user=new User({email,username});
   const registereduser=await User.register(user, password);
   req.login(registereduser,err=>{
    if(err) return next(err);
    console.log(registereduser);
   req.flash('success','welcome to yelpcamp');
   res.redirect('/campgrounds');
   })
   
}catch(e){
    req.flash('error',e.message);
    res.redirect('register');
}
}
module.exports.renderLogin=(req,res)=>{
    res.render('users/login');
};


module.exports.userLogin=
(req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
    res.redirect(redirectUrl);
};

module.exports.userLogout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}