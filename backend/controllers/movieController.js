const Movie = require('../models/movieModel');

//Function to read list of existing movies:
exports.getAll = async(req, res, next) => {
    try{
        const movies = await Movie.find();
        if(!movies){
            res.status(404).json({
                status:"Error",
                message: "Not found"
            })
        } else {
            res.status(200).json({
                status:"Ok",
                data: movies
            })
        }
    } catch(error) {
        res.status(500).json({
            status:"Error",
            message: error
        })
    }
}

//Function to create a movie:
exports.create = async(req, res, next) => {
   try{
        const newMovie = await Movie.create(req.body);
        res.status(200).json({
            status:"Created",
            data: newMovie
        })
    }
    catch(error) {
        if(error.name == "ValidationError"){
            res.status(400).json({
                status:"Bad request",
                message: error
            })
        } else { 
            res.status(500).json({
            status:"Error",
            message: error
            })
        }
    }
}

//Function to create a rating:
exports.createRating = async(req, res, next) => {
    try {
        const value = req.body.value;
        const movie = await Movie.findById(req.params.id);
        if(movie){
            let avg = movie.rateAverage;
            let count = movie.voteCount;

            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                voteCount: count+1,
                rateAverage: Math.round(((avg*count + value)/(count+1))*10)/10
            });
            res.status(200).json({
                status:"Created"
            })
        } else {
            res.status(404).json({
                status:"Not Found",
                message: "The requested movie ID does not exist"
            })
        }
    } catch(error) {
        res.status(500).json({
            status:"Error",
            message: error.message
        })
    }
}