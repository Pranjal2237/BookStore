const express=require("express");
const { ragister, login, loadUser, addAddress } = require("../controllers/user.js");
const { verifyToken } = require("../middleware/auth.js");

const router=express.Router();

router.post('/signup',ragister)
router.post('/login',login)
router.get('/',verifyToken,loadUser);
router.patch('/address',verifyToken,addAddress);

module.exports=router;