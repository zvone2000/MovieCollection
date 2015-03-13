
var MovieSchema = require('../schemas/movie');

// GET
exports.movies = function (req, res) {
 
  MovieSchema.find(function(err,movies){
      if(err){
        res.json(false);
      }
      else
      {
        res.json({movies: movies});
      }        
  });
};

// GET
exports.movie = function (req, res) {
  var id = req.params.id;
  
  MovieSchema.findById(id, function(err, movie){
    if(err)
      res.json(false);
    else
      res.json({movie: movie});  
  }); 
};

// POST
exports.addMovie = function (req, res) {
  var record = new MovieSchema();

  record.title = req.body.title;
  record.director = req.body.director;
  record.releaseYear = req.body.releaseYear;
  record.addOnDate = new Date().toJSON().replace('T', ' ').replace('Z', ' ').substring(0,19);
  record.addedByUser = req.user.displayName;

  record.save(function(err) {
    if(err)
      res.json(false);
    else
      res.json(true);   
  });
};

// PUT
exports.editMovie = function (req, res) {
  var id = req.params.id;
  
  MovieSchema.findByIdAndUpdate(id, {$set: {title: req.body.title, director: req.body.director, releaseYear: req.body.releaseYear/*, addedByUser:req.user.displayName*/ }},  function(err){ // TODO: uncomment when done
    if(err)
      res.json(false);
    else
    {
      res.json(true);
    }
  }); 
};

// DELETE
exports.deleteMovie = function (req, res) {
  var id = req.params.id;
  
  MovieSchema.findByIdAndRemove(id/*, {$set: {addedByUser:req.user.displayName }}*/, function(err){ // TODO: uncomment when done
    if(err)
      res.json(false);
    else
    {
      res.json(true);
    }
  });
};