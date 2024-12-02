import express from 'express';
import http from 'http';
import { Client } from 'pg';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import apiRouter from './routes';
dotenv.config();

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);

const client = new Client({
  connectionString: 'postgresql://postgres:password@localhost:5432/trig',
});

// io.on('connection', function (socket) {
//   console.log(`${socket.id} connected.`);
// });
//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', apiRouter);

server.listen(PORT, async function () {
  try {
    await client.connect();

    const query = await client.query('LISTEN new_event');

    client.on('notification', function (msg) {
      console.log(`Notificaiton incoming, ${msg}`);
      const payload = JSON.parse(msg.payload ?? '');
    });

    console.log(`Server running on port: ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
