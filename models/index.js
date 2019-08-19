import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configPath from '../config/config';
import dotenv from 'dotenv';
dotenv.config();
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = configPath[env];

const db = {};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env.DATABASE_URL)
  : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
