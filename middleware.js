const{campgroundSchema,reviewSchema}=require('./Schemas.js');
const ExpressError=require('./utils/ExpressError');
const campground=require('./models/campground');
const review=require('./models/review.js')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.isAuthor=async(req,res,next)=>{
const {id}=req.params;
const foundcampground=await campground.findById(id);
console.log(req.user);
    if(!foundcampground.author.equals(req.user._id)){
        req.flash('error','you do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.validatecampground=(req,res,next)=>{
   const {error}=campgroundSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}
module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const foundReview=await review.findById(reviewId);
        if(!foundReview.author.equals(req.user._id)){
            req.flash('error','you do not have permission to do that');
            return res.redirect(`/campgrounds/${id}`);
        }
        next();
    }