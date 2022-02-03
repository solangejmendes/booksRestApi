const express = require('express');
const router = express.Router();
const {Book, validateBook} = require("../models/books");


// POST: CREATE A NEW BOOK
router.post('/', async (req, res) => {
    const error = await validateBook(req.body);
    if(error.message) res.status(400).send(error.message);
    
    book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        genre: req.body.genre,
    });

    book
        .save()
        .then((book) => {
            res.send(book);
        })
        .catch((error) => {
            // If invalid, return 400 - bad request
            //if (error) return res.status(400).send(error.details[0].message);
            res.status(500).send("Book was not stored in the db");
        });
});

module.exports = router;