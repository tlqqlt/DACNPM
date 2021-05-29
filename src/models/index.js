/* eslint-disable import/no-dynamic-require */
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from 'config';
import logger from '../utils/logger';

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.get('db.database'),
  config.get('db.username'),
  config.get('db.password'),
  { host: config.get('db.host'), dialect: config.get('db.dialect') },
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    logger(path.join(__dirname, file));
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
