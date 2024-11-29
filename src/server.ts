import express from 'express';
import http from 'http';
import { Client } from 'pg';
import { Server } from 'socket.io';

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);

const client = new Client({
  connectionString: 'postgresql://postgres:password@localhost:5432/trigger',
});

io.on('connection', function (socket) {
  console.log(`${socket.id} connected.`);
});

server.listen(PORT, async function () {
  await client.connect();
  client.query('LISTEN database_changes');
  client.on('notification', function (msg) {
    const payload = JSON.parse(msg.payload ?? '');
    console.log(payload);
  });

  console.log(`Server running on port: ${PORT}`);
});
