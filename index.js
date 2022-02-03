const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const booksRoute = require('./routes/books')
const PORT = process.env.PORT || 3001

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/books', booksRoute);

//Connect to mongo db atlas
mongoose
    .connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true, }
    )
    .then(() => {
        console.log("connected to mongodb atlas");
    })
    .catch((error) => {
        console.log("Something wrong happened", error);
    });

//start server
app.listen(PORT,() => {
    console.log("Server started at PORT ", PORT);
})

