	
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/getPhoto', function(req, res) {
    res.sendfile(__dirname + '/getPhoto.html');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io = io.listen(server);

io.sockets.on('connection', function(socket) {
	 console.log("\n\n已建立連線，監聽中。。。\n\n");


    socket.on('get_PcWebcame', function(data) {
        console.log("已接收圖片:");
         io.sockets.emit('show_Img', data);
        /*io.sockets.emit('showImg', {
            img: data.img
        });*/
    });

});