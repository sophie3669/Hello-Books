import http from 'http';

import app from '../app'; // The express app we just created

import db from '../../server/models/index';

db.sequelize.sync().then(() => {
  const port = parseInt(process.env.PORT, 10) || 3000;
  app.set('port', port);

  const server = http.createServer(app);
  server.listen(port);
});
