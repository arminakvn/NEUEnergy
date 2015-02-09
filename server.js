// var restify = require('restify');
// var mongojs = require('mongojs');
// var db = mongojs('mongodb://127.0.0.1:27016/', ['buildings']);

// var server = restify.createServer();
 
// server.use(restify.acceptParser(server.acceptable));
// server.use(restify.queryParser());
// server.use(restify.bodyParser());


// server.listen(3000, function () {
//     console.log("Server started @ 3000");
// });


// server.get("/buildings", function (req, res, next) {
// 	db.buildings.find(function (err, buildings) {
//         res.writeHead(200, {
//             'Content-Type': 'application/json; charset=utf-8'
//         });
//         res.end(JSON.stringify(products));
//     });
//     return next();
// });
var express = require('express');
var mongoose = require('mongoose');

var config = {
  "db": "pudb/",  
  "host": "127.0.0.1",  
  "user": "",
  "pw": "",
  "port": 27016
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
// var uristring =  "mongodb://" + login + config.host + config.port + "/" + config.db;
var uristring = 'mongodb://127.0.0.1:27016/pudb/';
var mongoOptions = { db: { safe: true } };

// Connect to Database
mongoose.connect(uristring,function (err, res) {
  if(err){
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }else{
    console.log('Successfully connected to: ' + uristring);
  }
});


exports.mongoose = mongoose;
var app = express();
// define the schema from the dataset!
Schema = mongoose.Schema;

var BuildingSchema = new Schema({
	_id: Schema.Types.ObjectId,
  	Perimeter: { type: Number},
	Name: String,
	Area:{ type: Number},
	bID: { type: Number},
	Year_Acquired: String,
	Floors:{ type: Number},
	Centroid: [String],
	Footprint: {type: Number},
	Primary_Use: String,
	Outline: [Number]

}, {collection: 'buildingdb'});

BuildingSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Building').find({ bID: this.bID }, cb);
}

var SiteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Abbreviation: String,
  bID: { type: Number},
  Name: String,
  sID: {type: Number}
}, {collection: 'sitedb'});

var MeasurmentParallelSchema = new Schema({
	_id: Schema.Types.ObjectId,
  	timestamp: { type: Date }
}, {collection: 'measurementdb_parallel'});

var MeasurmentSerialSchema = new Schema({
	_id: Schema.Types.ObjectId,
  	timestamp: { type: Date },
  	value: {type: Number},
  	
}, {collection: 'measurementdb_serial'});

mongoose.model('Building', BuildingSchema);
mongoose.model('MeasurmentParallel', MeasurmentParallelSchema);
mongoose.model('MeasurmentSerial', MeasurmentSerialSchema);
mongoose.model('Site', SiteSchema);

Building = mongoose.model('Building');
MeasurmentParallel = mongoose.model('MeasurmentParallel');
MeasurmentSerial = mongoose.model('MeasurmentSerial');
Site = mongoose.model('Site');

exports.findAll = function(req, res){
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  Building.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findAll = function(req, res){
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  MeasurmentSerial.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function() {};
exports.add = function() {};
exports.update = function() {};
exports.delete = function() {};

app.get('/sites', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    Site.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/buildings', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    Building.find({}, function (err, docs) {
        res.json(docs);
    });
});
app.get('/buildings/:id', function (req, res) {
  console.log("id", req.params.id);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var building = new Building({bID: req.params.id});
  building.findSimilarTypes(function (err, building) {
    console.log(building[0]["_id"]); // woof
    Building.findById(building[0]["_id"], function (err, docs) {
    if (!err) {
      return res.send(docs);
    } else {
      return console.log(err);
    }
    });
  });
  
});
// app.param('building', function(req, res, next, id) {

//   // try to get the user details from the User model and attach it to the request object
//   Building.find(id, function(err, user) {
//     if (err) {
//       next(err);
//     } else if (building) {
//       req.building = building;
//       next();
//     } else {
//       next(new Error('failed to load building'));
//     }
//   });
// });
// app.param('id', function (req, res, next, id) {
//   console.log('CALLED ONLY ONCE');
//   next();
// })

// app.get('/building/:id', function (req, res, next) {
//   console.log('although this matches');
//   next();
// });

// app.get('/building/:id', function (req, res) {
//   console.log('and this matches too');
//   res.end();
// });
app.get('/measurments/:id', function (req, res) {
	concole.log("say at least");
	res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    MeasurmentSerial.findById(req.params.id, function (err, docs) {
	    if (err) return next(err);
	    res.json(docs);
    });
});
exports.import = function(req, res){
  Building.create(
    { "name": "Ben", "band": "DJ Code Red", "instrument": "Reason" }
  , function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
};
app.listen(3001, function() {
  console.log('%s listening at %s', app.name, app.url);
});
