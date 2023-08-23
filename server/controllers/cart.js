const Book=require("../models/Book.js")
const Cart=require("../models/Cart.js")

exports.addToCart=async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await Book.findById(id);
        const{bookname,genre,price,picturePath}=book;
        const newWishList=new Cart({
            bookname,
            genre,
            price,
            picturePath,
            user_id:req.user
        })
        await newWishList.save();
        res.status(201).json(newWishList);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

exports.removeToCart=async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await Cart.deleteOne({_id:id});
        if(!book){
            return res.status(404).json({msg:"Book Not Found in your WishList"})
        }
        res.status(201).json({msg:"Book has been removed from WishList"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

exports.allCart=async(req,res)=>{
    try{
        const books=await Cart.find({user_id:req.user});
        res.status(200).json(books);
    }catch(error)
    {
        res.status(400).json({error:error.message})
    }
}