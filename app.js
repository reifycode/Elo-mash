var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var http = require('http')
var server = http.createServer(app);
var io = require('socket.io')();

var elo = require('./elo.js');
var photolist = require('./photolist.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', (function() {
		photoA = photolist.getRandomPhoto();
		photoB = photolist.getRandomPhoto();

		while(photoB.id == photoA.id) {
			photoB = photolist.getRandomPhoto();
		}

		return {
			photoA: photoA,
			photoB: photoB
		};
	})());
});

io.on('connection', function(socket) {
	var address = socket.request.connection.remoteAddress;
	console.log(address);

	socket.on('clicked', function(data) {
		console.log(photolist.getPhotoByID(data.winnerID))
		elo.competition(photolist.getPhotoByID(data.winnerID), photolist.getPhotoByID(data.loserID), 1);

		var winner = (data.photoToChange == 'A') ? 'B' : 'A';
		socket.emit('set photo ' + winner, photolist.getPhotoByID(data.winnerID));

		socket.emit('set photo ' + data.photoToChange, (function() {
			photo = photolist.getRandomPhoto();

			while(photo.id == data.winnerID || photo.id == data.loserID) {
				photo = photolist.getRandomPhoto();
			}

			return photo;
		})());
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// app.listen(3000, function() {})
server.listen(4000, function() {
	console.log('Started at port :4000.');
});
io.listen(server);

module.exports = app;
