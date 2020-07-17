import io from 'socket.io-client';
var socket = io.connect('http://localhost:5000/test');

function subscribeToRandomInt(cb) {
  console.log("here again");
  socket.on('test', msg => cb(msg));
  //socket.emit('subscribeToTimer', 1000);
}

function getRecentData() {
  socket.emit('subscribeToTimer',1000);
}
export { subscribeToRandomInt, getRecentData };
