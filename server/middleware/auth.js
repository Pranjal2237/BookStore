const jwt=require("jsonwebtoken");

exports.createToken=(user)=>{
    const {_id}=user._id;
    const token=jwt.sign({_id},process.env.JWT_SECRET);
    return token
}

exports.verifyToken=(req,res,next)=>{
    try{
        let token = req.header("Authorization");
        if(!token)
        {
            return res.status(403).send("Access Denied");
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
          }
        const checkToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!checkToken)
        {
            return res.status(403).send("Access Denied")
        }
        req.user=checkToken;
        next();
    }catch(error)
    {
        res.status(500).json({error:error.message})
    }
}