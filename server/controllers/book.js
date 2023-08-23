const Book = require("../models/Book.js");
const User = require("../models/User.js");
const ApiFeatures = require("../utils/ApiFeatures.js");

exports.uploadBook = async (req, res) => {
  try {
    const { bookname, price, genre, summary, picturePath } = req.body;
    const book = new Book({
      bookname,
      price,
      genre,
      summary,
      picturePath,
      owner_id: req.user,
    });
    await book.save();
    res.status(201).json({ book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.allBooks = async (req, res) => {
  try {
    console.log(req.query);
    const resultPerPage=5;
    const apifeatures=new ApiFeatures(Book.find(),req.query).search().filter().sort().pagination(resultPerPage);
    const books=await apifeatures.query;
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.myBooks = async (req, res) => {
  try {
    const books = await Book.find({ owner_id: req.user });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
