import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import mainRouter from './routes/index';
import database from './db';

export default (config) => {
  const app = express();

  const { db } = config;

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  database(db);

  app.use(mainRouter);

  return app;
};
