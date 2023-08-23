const express=require("express");
const { addToCart, removeToCart, allCart } = require("../controllers/cart.js");
const { verifyToken } = require("../middleware/auth.js");

const router=express.Router();

router.post('/:id',verifyToken,addToCart)
router.get('/',verifyToken,allCart);
router.delete('/:id',verifyToken,removeToCart)

module.exports=router;