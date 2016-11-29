var express = require('express');
// var methodOverride = require('method-override')
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected")
});

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//DELETE a cars by ID
// router.delete('/:id/edit', function (req, res){
//     //find cars by ID
//     mongoose.model('cars').findById(req.id, function (err, cars) {
//         if (err) {
//             return console.error(err);
//         } else {
//             //remove it from Mongo
//             cars.remove(function (err, cars) {
//                 if (err) {
//                     return console.error(err);
//                 } else {
//                     //Returning success messages saying it was deleted
//                     console.log('DELETE removing ID: ' + cars._id);
//                     res.format({
//                         //HTML returns us back to the main page, or you can create a success page
//                           html: function(){
//                                res.redirect("/carss");
//                          },
//                          //JSON returns the item with the message that is has been deleted
//                         json: function(){
//                                res.json({message : 'deleted',
//                                    item : cars
//                                });
//                          }
//                       });
//                 }
//             });
//         }
//     });
// });
// router.use(methodOverride('_method'));

// var state = {
//   names: []
// }
//
// var resetState = function() {
//     state.names = [];
// };
// var kittySchema = mongoose.Schema({
//     name: String
// });
//
// var Kitten = mongoose.model('Kitten', kittySchema);
//
// var silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'
//
// silence.save(function (err, silence) {
//   if (err) return console.error(err);
//   // silence.speak();
// });
//
// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

var carSchema = mongoose.Schema({
  name: String
});

var Car = mongoose.model('Car', carSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'this car thing' });
});
router.post('/cars', function (req, res) {
  console.log(req.body)
  var ford = new Car({ name: req.body.carinput});
  ford.save(function(err,b){
    if (err) return console.error(err);
  })
  console.log (req.body, req.query)
    res.redirect('/cars');
})

router.get('/cars', function(req, res, next){
  // resetState();
  console.log (req.query)
  // res.render('cars',{})
  Car.find().lean().exec(function (err, cars) {
    res.render('cars', {
      title: 'this car thing',
      cars: cars
    });
  });
});
//SHOW PAGE
router.get('/cars/:id', function(req,res,next){
  Car.findById(req.params.id, function (err, car) {
    console.log(car)
    res.render('show',{
      car: car
    })
  });
  console.log(req.params)
})

router.get('/cars/:id/edit', function(req,res,next){
  Car.findById(req.params.id, function (err, car) {
    console.log(car)
    res.render('edit',{
      car: car
    });
  });
  console.log(req.params)
});

router.post('/cars/:id', function (req,res,next){
  console.log(req.body)
  // res.render(car)
})

router.post('/cars', function (req, res) {
  console.log(req.body)
  var ford = new Car({ name: req.body.carinput});
  ford.save(function(err,b){
    if (err) return console.error(err);
  })
  console.log (req.body, req.query)
    res.redirect('/cars');
})


module.exports = router;
