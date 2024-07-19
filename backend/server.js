const mongoose = require('mongoose');

const app = require('./index');

const dotenv = require('dotenv').config();

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