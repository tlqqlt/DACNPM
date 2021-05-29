import config from 'config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import layouts from 'express-ejs-layouts';
import models from './models';

import logger from './utils/logger';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Static file
app.use(express.static(path.join(path.resolve(__dirname), 'public')));

// EJS
app.set('views', path.join(path.resolve(__dirname), 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

// MIDDLEWARES
app.use(helmet());
app.use(cors());

// LOG
const accessFileStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(path.resolve(__dirname), 'logs'),
});

app.use(
  isProduction
    ? morgan('combined', { stream: accessFileStream })
    : morgan('dev'),
);

// ROUTES
app.get('/', (req, res) => {
  res.render('index', { title: 'test' });
});

models.sequelize
  .sync({ force: true })
  .then(() => {
    logger('Connection successful');
    app.listen(config.get('app.port'), () => {
      logger(
        `Lauch the Server at ${config.get('app.domain')}:${config.get(
          'app.port',
        )}`,
      );
    });
  })
  .catch((error) => {
    logger('Error creating connection:', error);
  });
