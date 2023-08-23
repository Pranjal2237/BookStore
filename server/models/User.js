const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email should be unique']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        min:[8,'password should be greater than 8 characters']
    },
    address:{
        type:String,
        default:""
    }
},{timestamps:true});

const User=mongoose.model('User',UserSchema);
module.exports=User;