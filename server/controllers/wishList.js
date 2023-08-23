const Book=require("../models/Book.js")
const WishList=require("../models/WishList.js")

exports.addToWishList=async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await Book.findById(id);
        console.log(book);
        const{bookname,genre,price,picturePath}=book;
        const newWishList=new WishList({
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

exports.removeToWishList=async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await WishList.deleteOne({_id:id});
        if(!book){
            return res.status(404).json({msg:"Book Not Found in your WishList"})
        }
        res.status(201).json({msg:"Book has been removed from WishList"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

exports.allWishList=async(req,res)=>{
    try{
        const books=await WishList.find({user_id:req.user});
        res.status(200).json(books);
    }catch(error)
    {
        res.status(400).json({error:error.message})
    }
}