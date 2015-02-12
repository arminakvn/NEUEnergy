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

BuildingSchema.methods.findSimilarName = function (cb) {
  return this.model('Building').find({ Name: this.Name }, cb);
}


var SiteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Abbreviation: String,
  bID: { type: Number},
  Name: String,
  sID: {type: Number}
}, {collection: 'sitedb'});

SiteSchema.methods.findSimilarName = function (cb) {
  return this.model('Site').find({ Name: this.Name }, cb);
}

SiteSchema.methods.findSimilarIds = function (cb) {
  return this.model('Site').find({ sID: this.sID }, cb);
}


// var MeasurmentParallelSchema = new Schema({
// 	_id: Schema.Types.ObjectId,
//   	timestamp:  Date
// }, {collection: 'measurementdb_parallel'});

var MeasurmentParallelSchema = new Schema({
  timestamp: Number,
  any: Schema.Types.Mixed
}, {collection: 'measurementdb_parallel'});


var MeasurmentSerialSchema = new Schema({
	_id: Schema.Types.ObjectId,
  	timestamp: Number,
  	value: Number,
    sID: Number
  	
}, {collection: 'measurementdb_serial'});

MeasurmentSerialSchema.methods.findSimilarIds = function (cb) {
  // return this.model('MeasurmentSerial').find({ sID: this.sID }, cb);
  query = this.model('MeasurmentSerial').find({});
  query.where('sID', this.sID);
  query.limit();
  return query.exec(cb);
}

MeasurmentSerialSchema.methods.findSimilarIdsTimes = function (cb) {
  // return this.model('MeasurmentSerial').find({ sID: this.sID }, cb);
  query = this.model('MeasurmentSerial').find({});
  query.where('sID', this.sID);
  query.where('timestamp', this.timestamp);
  query.limit(50);
  return query.exec(cb);
}

MeasurmentParallelSchema.methods.findSimilarIdsTimes = function (cb) {
  // return this.model('MeasurmentSerial').find({ sID: this.sID }, cb);
  query = this.model('MeasurmentParallel').find({});
  query.where('timestamp', this.timestamp);
  // query.where("43", this.sID);
  query.limit(50);
  return query.exec(cb);
}

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

exports.findAll = function(req, res){
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  MeasurmentParallel.find({},function(err, results) {
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

app.get('/buildingname/:name', function (req, res) {
  console.log("name", req.params.name);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var building = new Building({Name: req.params.name});
  building.findSimilarName(function (err, building) {
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

app.get('/sitename/:name', function (req, res) {
  console.log("name", req.params.name);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var site = new Site({Name: req.params.name});
  site.findSimilarName(function (err, site) {
    // console.log(site[0]["_id"]); // woof
    Site.findById(site[0]["_id"], function (err, docs) {
    if (!err) {
      return res.send(docs);
    } else {
      return console.log(err);
    }
    });
  });
  
});

app.get('/siteid/:id', function (req, res) {
  console.log("id", req.params.id);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var site = new Site({sID: req.params.id});
  site.findSimilarIds(function (err, site) {
    console.log(site[0]["_id"]); // woof
    Site.findById(site[0]["_id"], function (err, docs) {
    if (!err) {
      return res.send(docs);
    } else {
      return console.log(err);
    }
    });
  });
  
});


app.get('/measurements/:sid', function (req, res) {
  console.log("id", req.params.sid);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var measurementdb_serial = new MeasurmentSerial({sID: req.params.sid});
  measurementdb_serial.findSimilarIds(function (err, measurementdb_serial) {
    // console.log(measurementdb_serial[0]["_id"]); // woof
    MeasurmentSerial.findById(measurementdb_serial["_id"], function (err, docs) {
    if (!err) {
      each = measurementdb_serial;
      return res.json(each);
      
    } else {
      return console.log(err);
    }
    });
  });
  
});

app.get('/measurements_s/:sid/:timestamp', function (req, res) {
  console.log("id", req.params.sid);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var measurementdb_serial = new MeasurmentSerial({sID: req.params.sid, timestamp: req.params.timestamp});
  measurementdb_serial.findSimilarIdsTimes(function (err, measurementdb_serial) {
    // console.log(measurementdb_serial[0]["_id"]); // woof
    MeasurmentSerial.findById(measurementdb_serial["_id"], function (err, docs) {
    if (!err) {
      each = measurementdb_serial;
      return res.json(each);
      
    } else {
      return console.log(err);
    }
    });
  });
  
});


app.get('/measurements_p/:timestamp/:sid', function (req, res) {
  console.log("id", req.params.sid);
  console.log("time", req.params.timestamp);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var measurementdb_parallel = new MeasurmentParallel({timestamp: req.params.timestamp});
  measurementdb_parallel.findSimilarIdsTimes(function (err, measurementdb_parallel) {
    MeasurmentParallel.findById(measurementdb_parallel["_id"], function (err, docs) {
    if (!err) {
      return res.json(docs);
      // return res.send(docs);
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
// app.get('/measurments/:id', function (req, res) {
// 	concole.log("say at least");
// 	res.header("Access-Control-Allow-Origin", "*"); 
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     MeasurmentSerial.findById(req.params.id, function (err, docs) {
// 	    if (err) return next(err);
// 	    res.json(docs);
//     });
// });
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
