// Initializes the `user-service` service on path `/user-service`
const { UserService } = require('./user-service.class');
const createModel = require('../../models/user-service.model');
const hooks = require('./user-service.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-service', new UserService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-service');

  service.hooks(hooks);
};
