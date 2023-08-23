const express=require("express");
const { addToWishList, removeToWishList, allWishList } = require("../controllers/wishList.js");
const { verifyToken } = require("../middleware/auth.js");

const router=express.Router();

router.post('/:id',verifyToken,addToWishList)
router.get('/',verifyToken,allWishList)
router.delete('/:id',verifyToken,removeToWishList)

module.exports=router;