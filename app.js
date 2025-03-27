if(process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}


const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');

const flash=require('connect-flash');
const methodOverride=require('method-override');
const session=require('express-session');
const campgroundRoutes=require('./routes/campgrounds');
const reviewRoutes=require('./routes/reviews');
const userRoutes=require('./routes/users');
const ExpressError=require('./utils/ExpressError')

const {campgroundSchema , reviewSchema}=require('./Schemas.js');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log("CONNECTION OPEN!!!!");
})
.catch(err=>{
console.log(" ERROR OCCURED");
console.log(err);
});


app.engine('ejs' ,ejsMate);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


const sessionConfig={
    secret:'thisshouldbeasecret',
    resave:false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000* 60* 60* 24* 7,   // defining cookie and it's content
        maxAge:1000* 60* 60* 24* 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //function to tell system how do we store the user in a session
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname,'public')));

app.use(methodOverride('_method'));         // used because by default there is no set method expect post and get
app.use(express.urlencoded({extended:true}))        // needed to work with url , essentially take data from url




app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success'); //makes sure we have access to 'success' message in every tempate automatically
    res.locals.error=req.flash('error');
    next();
})

app.get('/fakeuser',async(req,res)=>{
    const user=new User({email:'colt@gmail.com',username:'colttt'});
    const newUser=await User.register(user,'chicken');
    res.send(newUser);
})

app.use('/',userRoutes);
app.use('/campgrounds',campgroundRoutes);        // route specification for campgrounds
app.use('/campgrounds/:id/reviews',reviewRoutes);    //route specification for reviews

app.get('/',(req,res)=>{
    res.render('Home');
})


app.all('*',(req,res,next)=>{
next(new ExpressError('Page not found',404));           // if page is not found or url is wrong
})
app.use((err,req,res,next)=>{
    const{statusCode=500}=err;
    if(!err.message) err.message='Something is wrong here';
    res.status(statusCode).render('partials/error',{err})
})
app.listen(3000,()=>{
console.log("on port 3000");
})
