import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import AppRouter from './routes';
import connectDB from './config/database';

const app = express();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 4200);
const port = app.get('port');
app.use(helmet());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ['Authorization']
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
