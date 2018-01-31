// needed parrams and modules
let app = require('express')(),
    serve   = require('express-static'),
    cors = require('cors'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    users = 0,
    winner = null;

app.get('/', cors(), function (req, res){
    res.sendFile(__dirname + '/index.html');
});

// use files inside the folder
app.use(serve(__dirname + '/'));

io.on('connection', function(socket){
    // count player
    users++;

    // game
    socket.on('game', function(ioArr){

        console.log('The players: ' + ioArr);
        io.emit('game', ioArr);

    });

    if(users<3){
        // queueing players
        if(users===1){
            turn = '0';
        } else if(users===2){
            turn = 'X';
        }

        // turn
        socket.emit('turn',turn);

        // room for players
        socket.join('players',function (error) {
            console.log(socket.rooms);
        });
    } else {
        console.log('all places busy');
    }

    socket.emit('user',users);

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
