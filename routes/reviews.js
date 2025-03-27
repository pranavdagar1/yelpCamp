const express=require('express');
const router=express.Router({mergeParams:true});
const{isLoggedIn,validateReview,isReviewAuthor}=require('../middleware');

const catchAsync=require('../utils/catchAsync.js');
const ExpressError=require('../utils/ExpressError.js');

const Campground=require('../models/campground');
const Review=require('../models/review.js');
const { reviewSchema}=require('../Schemas.js');
const reviews=require('../controllers/reviews.js');
const review = require('../models/review.js');




router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview));
    
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports=router;