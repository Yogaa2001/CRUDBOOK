const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/books/:isbn?')
  .post(bookController.createBook)
  .get(bookController.getBooks)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook)

module.exports = router;
