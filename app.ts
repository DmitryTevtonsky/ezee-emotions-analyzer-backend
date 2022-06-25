import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';

import { configureSwagger } from './src/swagger';
import { configureMulter } from './src/files-storage';
import { initRoutes } from './src/routes';

const PORT = process.env.PORT || 3000;

// const uri = "mongodb://localhost:27017"

const app = express();

app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(cookieParser());
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  response.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// configureSwagger(app);
configureMulter(app);

// const client = new MongoClient(uri, { keepAlive: true });

async function main() {
  try {
    // await client.connect();

    console.log('Connected correctly to server');

    const server = http.createServer(app);
    console.log({server});
    
    const io = new Server(server, {
      cors: {
        origin: "http://84.252.137.43",
        credentials: true
      }
      
    });
    console.log({io});

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    server.listen(PORT, () => {
      console.log('We are live on ' + PORT);

      // const mainDb = client.db('emotions');
      initRoutes(app, io);
    });
  } catch (error) {
    console.log('ERROR EXECUTED: ', error);
  }
};

main();

module.exports = app;

