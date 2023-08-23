const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const morgan=require("morgan")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const helmet=require("helmet")
const userRoute=require("./routes/userRoute.js")
const bookRoute=require("./routes/bookRoute.js")
const wishListRoute=require("./routes/wishlistRoute.js")
const cartRoute=require("./routes/cartRoute.js")
const multer=require("multer")
const path=require("path")
const { verifyToken } = require("./middleware/auth.js");
const { uploadBook } = require("./controllers/book.js")

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
 const upload = multer({ storage });

app.post("/user/uploadbook", verifyToken, upload.single("picture"), uploadBook);

app.use('/user',userRoute);
app.use('/',bookRoute);
app.use('/user/wishlist',wishListRoute);
app.use('/user/cart',cartRoute);

PORT=process.env.PORT||8080
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening at port:${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log(`${error} did not connect`)
})
