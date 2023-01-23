// Initializes the `ws` service on path `/ws`
const { Ws } = require('./ws.class');
const createModel = require('../../models/ws.model');
const hooks = require('./ws.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ws', new Ws(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ws');

  service.hooks(hooks);
};
