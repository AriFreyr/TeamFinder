import app from './config/express';
import Models from './server/models';
import config from './config/env';

const debug = require('debug')('team-finder-api:index');

// listen on port config.port

Models.sequelize.sync({ force: true }).then(() => {
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`);
  });
});

export default app;
