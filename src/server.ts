import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

// setup
dotenv.config();

const { SERVER_PORT, SERVER_DOMAIN } = process.env;

if (SERVER_PORT === undefined || SERVER_DOMAIN === undefined) {
  throw new Error("Please define constants in '.env' file");
}
const server = express();

server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());

// Api Router
const wheels = [
  { id: 1, title: 'Wheel 1' },
  { id: 2, title: 'Wheel 2' },
  { id: 3, title: 'Wheel 3' },
  { id: 4, title: 'Wheel 4' },
];

const apiRouter = express.Router();
server.use('/api', apiRouter);

apiRouter.get('/wheels', (req, res) => {
  res.status(200).json(wheels);
});

apiRouter.post('/wheels', (req, res) => {
  const { body } = req;
  const newWheel = { id: 5, title: body.title };
  wheels.push(newWheel);
  res.status(201).json(newWheel);
});

// Server init
server.listen(SERVER_PORT, () => {
  console.log(`server is running on: http://${SERVER_DOMAIN}:${SERVER_PORT}`);
});
