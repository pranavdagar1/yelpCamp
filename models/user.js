const mongoose=require('mongoose');
const pasportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
UserSchema.plugin(pasportLocalMongoose);
module.exports=mongoose.model('User',UserSchema)