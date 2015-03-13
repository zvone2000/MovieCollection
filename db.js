var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds039251.mongolab.com:39251/movies');

module.exports = mongoose.connection;