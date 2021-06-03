import config from 'config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
// import layouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'connect-flash';
import models from './models';
import routes from './routes';
import generateHash from './utils/generateHash';

import logger from './utils/logger';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Static file
app.use(express.static(path.join(path.resolve(__dirname), 'public')));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(__dirname), 'views'));
// app.use(layouts);

// MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: config.get('session.key'),
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
  res.render('index', { title: 'Sinh Vien' });
});
app.use('/', routes);

models.sequelize
  .sync({ force: true })
  .then(() => {
    const admin = {
      username: 'admin',
      email: 'admin@admin.com',
      password: generateHash('admin123'),
      isAdmin: true,
      role: 'admin',
    };
    models.User.create(admin).then(() => {});

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
