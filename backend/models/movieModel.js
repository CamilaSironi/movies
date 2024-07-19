const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {type: String, required:[true, `'Title' must not be empty`], 
        validate:{
            validator: function(title){
                return /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(title);
            }, 
            message: `'Title' contains invalid characters. Only letters, numbers and spaces are allowed.`
        },
        validate:{
            validator: function(title){
                return title.length < 51;
            },
            message: `The length of 'Title' must be 50 characters or fewer`
        }
    },
    category: {type: String, required:[true, `'Category' must not be empty`],
        validate:{
            validator: function(category){
                return ["Action", "Science Fiction", "Drama", "Thriller", "Horror", "Comedy"].includes(category);
            },
            message: `'Category' is not in the correct format. Only the following categories are allowed: Action, Science Fiction, Drama, Thriller, Horror, and Comedy`
        }
    },
    releaseYear: {type: Number, min: [1888, `'Release Year' must be greater than or equal to '1888'`], max: [2024, `'Release Year' must be less than or equal to '2024'`]},
    rateAverage: {type: Number, default: 1, 
        min:[1, "Rating must be above 1.0"],
        max:[5, "Rating must be below 5.0"]
    },
    voteCount: {type: Number, default: 0}
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;