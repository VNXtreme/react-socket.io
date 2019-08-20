const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//routes
app.use(index);

io.on("connection", socket => {
  socket.on('message', data=>{
    socket.broadcast.emit("new message", data);
  })

  socket.on("disconnect", () => console.log("client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
