import './bootstrap';

import { GraphQLServer } from 'graphql-yoga';
import Youch from 'youch';
import 'express-async-errors';

import path from 'path';

import resolvers from './app/resolvers/resolvers';
import logger from './config/logger';

// Uncomment this line to enable database access
// --------
// import './database';

class App {
  constructor() {
    this.server = new GraphQLServer({
      typeDefs: path.resolve(__dirname, 'schema.graphql'),
      resolvers,
    });
    logger.info('Server up');
    this.exceptionHandler();
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
