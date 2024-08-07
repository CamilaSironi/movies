const cors = require('cors');

const express = require('express');

const movieRouter = require('./routers/movieRouter');

const app = express();

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
