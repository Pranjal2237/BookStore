const mongoose=require("mongoose")

const WishListSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:[true,'book name required']
    },
    genre:{
        type:String,
        required:[true,'book genre is required'],
        enum:['Horror','Comedy','Drama','Spritual','Sci-fi']
    },
    price:{
        type:Number,
        required:[true,'price is required'],
        min:[0,'invalid price']
    },
    picturePath:{
        type:String,
        required:[true,'enter picturePath']
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const WishList=mongoose.model('WishList',WishListSchema);
module.exports=WishList