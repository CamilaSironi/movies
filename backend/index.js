const cors = require('cors');

const dotenv = require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');

const movieRouter = require('./routers/movieRouter');

const app = express();

const DB = process.env.DB_URL;

const port = process.env.PORT || 3000;


//Connection to DB:
mongoose.connect(DB).then(() => {
    console.log('Connected to DB succesfully');
});

//Connection to port:
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});

app.use(cors(
    {
        origin:["https://movies-front-five.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use(express.json());

//Paths to routers:

app.use('/api/v1/movies', movieRouter);

module.exports = app;
