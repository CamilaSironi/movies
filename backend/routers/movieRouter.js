const express = require('express');

const movieController = require('../controllers/movieController');

const movieRouter = express.Router();

//Paths for movies:
movieRouter.get('/', movieController.getAll)
            .post('/', movieController.create);

movieRouter.post('/:id/ratings', movieController.createRating)

module.exports = movieRouter;