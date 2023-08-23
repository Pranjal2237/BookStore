const mongoose=require("mongoose");

const BookSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:[true,'book name is required']
    },
    summary:{
        type:String,
        required:[true,'summary is required']
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
    owner_id:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

const Book=mongoose.model('Book',BookSchema);
module.exports=Book;