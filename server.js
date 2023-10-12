const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let onlineCount = 0;

app.get('/', (req, res) => {res.sendFile(__dirname + '/index.html');});
app.use("/style", express.static('style'));

io.on('connection', (socket) => {
  onlineCount++;
  console.log('a user connected.', onlineCount, 'online');

  socket.on('disconnect', () => {
    onlineCount = (onlineCount <= 0) ? 0 : onlineCount -= 1;
    console.log('user disconnected', onlineCount, 'online');
  });

  socket.on('myMessage' , (msg) => {
    io.emit('allMessage', msg);
  });
});
server.listen(5512, () => {
    console.log("Server listening on port  5512");
});