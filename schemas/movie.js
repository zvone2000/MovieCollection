var mongoose = require('mongoose');

module.exports = mongoose.model('Movie', {
	title: String,
	director: String,
	releaseYear: String,
	addOnDate: String,
	addedByUser: String
});