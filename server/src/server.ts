import express from 'express';
import http from 'http';
import { Client } from 'pg';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import apiRouter from './routes';
import cors from 'cors';
import { Database } from './config/database.confitg';
dotenv.config();

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

io.on('connection', function (socket) {
  console.log(`${socket.id} connected.`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', apiRouter);

server.listen(PORT, async function () {
  try {
    await Database.connect();
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
