const Review=require('../models/review.js');
const Campground=require('../models/campground');

module.exports.createReview=async(req,res)=>{

        const campground=await Campground.findById(req.params.id);
        const review=new Review(req.body.review);
        review.author=req.user._id;
        campground.reviews.push(review);
       await review.save();
       await campground.save();
       req.flash('success',"review created successfully");
       res.redirect(`/campgrounds/${campground._id}`);
       const reviews = await Review.find({}).populate('author');

};
module.exports.deleteReview=async(req,res)=>{
       const {id,reviewId}=req.params;
       await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/campgrounds/${id}`);
}