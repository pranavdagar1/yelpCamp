const mongoose=require('mongoose');
const Review=require('./review');
const Schema=mongoose.Schema;

const ImageSchema=new Schema({
    
        url:String,
        filename:String
    
})
ImageSchema.virtual('thumbnail').get(function(){    ///adds a virtual property called thumbanild so you can acces img.thumbnail 
return this.url.replace('/upload','/upload/w_200')
})

const opts={toJSON: { virtuals:true}};
const CampgroundSchema=new Schema({
    title:String,
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            requred:true
        }
    },
    images:[ImageSchema],
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
        type: Schema.Types.ObjectId,
        ref:"Review"
        }
    ]
},opts);
CampgroundSchema.virtual('properties.popUpMarkup').get(function(){    ///adds a virtual  nested property called popMarkUp so you can acces img.thumbnail 
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0,20)}...</p>`;
})
CampgroundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{ // for id in each review
                $in:doc.reviews // in document named reviews
            }
        })
    }
})
module.exports=mongoose.model('Campground',CampgroundSchema);