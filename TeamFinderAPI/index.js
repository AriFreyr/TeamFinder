import Promise from 'bluebird';
import config from './config/env';
import app from './config/express';

// promisify mongoose
Promise.promisifyAll(mongoose);

const debug = require('debug')('team-finder-api:index');

// listen on port config.port
app.listen(config.port, () => {
  debug(`server started on port ${config.port} (${config.env})`);
});

export default app;
