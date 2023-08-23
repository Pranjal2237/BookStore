const express=require("express");
const { verifyToken } = require("../middleware/auth");
const { myBooks, allBooks } = require("../controllers/book");

const router=express.Router();
router.get('/user/mybooks',verifyToken,myBooks);
router.get('/books',allBooks);

module.exports=router;