const User=require("../models/User.js")
const bcrypt=require("bcryptjs")
const {createToken}=require("../middleware/auth.js")

exports.ragister=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const salt=await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser=new User({
            name,email,password:passwordHash
        });
        await newUser.save();
        delete newUser.password;
        const token=createToken(newUser);
        res.status(201).json({newUser,token});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        console.log(email,password);
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ msg: "User does not exist. " });
        }
        const checkPassword=await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(404).json({msg:"invalid credentials"})
        }
        delete user.password;
        const token=createToken(user);
        res.status(200).json({user,token});
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.loadUser=async(req,res)=>{
    try {
        const user=await User.findById(req.user);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.addAddress=async(req,res)=>{
    try {
        const {address}=req.body
        const user=await User.findByIdAndUpdate(req.user,{address})
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}