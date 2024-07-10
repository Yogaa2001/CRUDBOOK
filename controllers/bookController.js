const Book = require('../models/bookModel');
const helper = require('../helper')

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const { title, author, description, publicationYear } = req.body;

        // Basic validation
        if (!title || !author || !description || !publicationYear) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        // Generate ISBN
        const isbn = helper.uniCodeGenerator('0',13);

        // Create new book
        const newBook = new Book({
            title,
            author,
            description,
            publicationYear,
            isbn
        });

        // Save the book
        const book = await newBook.save();
        res.status(201).send({ message: 'Created Successfully', book });
    } catch (error) {
            res.status(500).send({ error: error.message });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const queryData = req.query
        const paramData = req.params
        let queryObject = {}
  
        const perPage = queryData.limit
        const page = queryData.page || 1
        const skip = perPage * page - perPage || 0

        if (paramData.isbn) {
            queryObject.isbn = paramData.isbn
          }

        const books = await Book.find(queryObject).sort({ _id: -1 }).skip(skip).limit(perPage);
        if (!books) {
            return res.status(404).send({ error: 'Book not found' });
        }
        res.status(200).send({message:'Listed_Successfully',Book:books});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update a book by ISBN
exports.updateBook = async (req, res) => {
    try {
        const body = req.body
        const books = await Book.findOne({isbn:req.params.isbn}).exec()
        if (!books) {
            return res.status(404).send({ error: 'Book not found' });
        }
        const update = {
            title : body.title || books.title,
            author: body.author || books.author,
            description: body.description || books.description,
            publicationYear: body.publicationYear || books.publicationYear,

        }
        const book = await Book.findOneAndUpdate({ isbn: req.params.isbn }, update, { new: true});
 
        res.status(200).send({message:'Updated_Successfully',Book:book});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Delete a book by ISBN
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
