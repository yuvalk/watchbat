var fs = require('fs'),
    util = require('util'),
    http = require('http'),
    async = require('async'),
    AWS = require('aws-sdk'),
    uuid = require('node-uuid'),
    express = require('express'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    port = 1337;

AWS.config.update({region: 'us-west-2'});
var s3 = new AWS.S3();
var app = express();
app.use(serveStatic(__dirname));
app.use(bodyParser.json());

app.get("/watchbat/737638bc-312c-495c-a5e4-113b90432ad4/logins", function(req,res) {
	fs.readFile('logins.txt', function(error, content) {
		if (error) {
			res.writeHead(500);
			res.end();
		}
		else {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(content, 'utf-8');
		}
	});
});

app.get("/watchbat/covermap", function(req,res) {
    console.log("!!!!");
    res.writeHead(200, {"Content-Type": "text/html"});

var html = (function () {/*  
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Circles</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>

// This example creates circles on the map, representing populations in North
// America.

// First, create an object containing LatLng and population for each city.
var sessionsmap = {
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    var params = {
        Bucket: 'watchbat', /* required */
        EncodingType: 'url',
        Prefix: ''
    };
    s3.listObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            // console.log(data);           // successful response
            async.each(data.Contents, function(obj, callback) {
            //data.Contents.forEach( function (obj) {

                var params = {
                    Bucket: 'watchbat',
                    Key: obj.Key
                };
                s3.getObject(params, function(err, content) {
                    if (err) {
                        console.log("ERROR: " + err);
                    } else {
                        try {
                            var occ = JSON.parse(content.Body.toString());
                            if (occ.action == "session" && occ.location) {
				occ.id = occ.id.replace(/\-/g,'');
				var newloc = occ.id + ": { center: { lat: " + occ.location.start.location.latitude + ", lng: " + occ.location.start.location.longitude + "}, mag: 1 }, ";
                                console.log(newloc);
                                html += newloc;
				var newloc = occ.id + ": { center: { lat: " + occ.location.end.location.latitude + ", lng: " + occ.location.end.location.longitude + "}, mag: 1 }, ";
                                console.log(newloc);
                                html += newloc;
                            }
                        } catch (e) {
                            console.log("ERROR: " + e);
                        }
                    }
                    callback();
                });
            }, function (err) {
html += (function () {/*
};

function initMap() {
  // Create the map.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: new google.maps.LatLng(31.631893,34.6761535),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  for (var sess in sessionsmap) {
    // Add the circle for this city to the map.
    var sessCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: sessionsmap[sess].center,
      radius: Math.sqrt(sessionsmap[sess].mag) * 1000
    });
  }
}

    </script>
    <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCj_jIOhRtmxMq-X4lDB4xjExeZorlKPlc&signed_in=true&callback=initMap"></script>
  </body>
</html>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    res.end(html);
            });
        }
    });

});
app.post("/watchbat/api/login", function(req,res) {
	console.log("login: " + JSON.stringify(req.body));
	if (req.body.observer("eyalvanunu@gmail.com") > -1) {
		// User is Eyal, not interesting
	} else {
		// not eyal
        fs.appendFile('logins.txt', '\n' + req.body.logintime + ' ' + req.body.observer.displayName + ' emails:' + JSON.stringify(req.body.observer.emails), function (err) {});
	}
});
app.get("/watchbat/heatmap", function(req,res) {
    console.log("!!!!");
    res.writeHead(200, {"Content-Type": "text/html"});

var html = (function () {/*  
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Heatmaps</title>
    <style>
      html, body, #map-canvas {
        height: 100%;
        margin: 0px;
        padding: 0px
      }
      #panel {
        position: absolute;
        top: 5px;
        left: 50%;
        margin-left: -180px;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=visualization"></script>
    <script>
var map, pointarray, heatmap;

var taxiData = [
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    var params = {
        Bucket: 'watchbat', /* required */
        EncodingType: 'url',
        Prefix: ''
    };
    s3.listObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            // console.log(data);           // successful response
            async.each(data.Contents, function(obj, callback) {
            //data.Contents.forEach( function (obj) {

                var params = {
                    Bucket: 'watchbat',
                    Key: obj.Key
                };
                s3.getObject(params, function(err, content) {
                    if (err) {
                        console.log("ERROR: " + err);
                    } else {
                        try {
                            var occ = JSON.parse(content.Body.toString());
                            if (occ.action == "occurrence" && occ.location) {
                                var newloc = "new google.maps.LatLng(" + occ.location.latitude + ", " + occ.location.longitude + "),";
                                console.log(newloc);
                                html += newloc;
                            }
                        } catch (e) {
                            console.log("ERROR: " + e);
                        }
                    }
                    callback();
                });
            }, function (err) {
html += (function () {/*
];

function initialize() {
  var mapOptions = {
    zoom: 9,
    center: new google.maps.LatLng(31.631893,34.6761535),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var pointArray = new google.maps.MVCArray(taxiData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

google.maps.event.addDomListener(window, 'load', initialize);

    </script>
  </head>

  <body>
    <div id="panel">
      <button onclick="toggleHeatmap()">Toggle Heatmap</button>
      <button onclick="changeGradient()">Change gradient</button>
      <button onclick="changeRadius()">Change radius</button>
      <button onclick="changeOpacity()">Change opacity</button>
    </div>
    <div id="map-canvas"></div>
  </body>
</html>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    res.end(html);
            });
        }
    });

});
app.post("/watchbat/api/login", function(req,res) {
	console.log("login: " + JSON.stringify(req.body));
	if (req.body.observer("eyalvanunu@gmail.com") > -1) {
		// User is Eyal, not interesting
	} else {
		// not eyal
        fs.appendFile('logins.txt', '\n' + req.body.logintime + ' ' + req.body.observer.displayName + ' emails:' + JSON.stringify(req.body.observer.emails), function (err) {});
	}
});
app.post("/watchbat/api", function(req,res) {
    var facts=observation2facts(req.body);
    console.log(JSON.stringify(facts));
    writeS3Facts(facts);
    res.sendStatus(200);
});


http.createServer(app).listen(port);
util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
console.log(JSON.stringify(s3));

function observation2facts(obs) {
    var facts = [];
    var observations = [];
    var obsid = "session-" + uuid.v4();
    obs.occurrences.forEach( function (occ) {
        var factid = "occurrence-" + uuid.v4();
        var fact = { action: "occurrence", id: factid, observation_id: obsid, type: "hearing", animal: "Tadarida teniotis", observer: obs.observer, time: occ.time, location: occ.location};
        facts.push (fact);
        observations.push (fact);
    });
    facts.push ({ action: "session", type: "hearing", id: obsid, observer: { authentication_type: "google+", data: obs.observer }, time: obs.start_time, session_times: { start: obs.start_time, end: obs.end_time }, location: { start: obs.start_location, end: obs.end_location }, observations: observations, count: obs.count });

    return facts;
}

function writeS3Facts(facts) {
    facts.forEach( function (fact) {
        var date = new Date(fact.time);
        var key = "watchbat/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getHours() + 1) + "/" + fact.id;
        var params = {Bucket: 'watchbat', Key: key, Body: JSON.stringify(fact)};
        s3.putObject(params, function(err, data) {
        if (err)       
            console.log(JSON.stringify(s3) + " ! " + err)     
        else
            console.log("Successfully uploaded data to myBucket/myKey");   
        });
    });
}
