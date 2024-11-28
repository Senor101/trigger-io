import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 8000;

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", function (socket) {
  console.log(`${socket.id} connected.`);
});

server.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});
