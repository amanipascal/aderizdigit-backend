// Initializes the `nestedMenu` service on path `/nested-menu`
const { NestedMenu } = require('./nested-menu.class');
const createModel = require('../../models/nested-menu.model');
const hooks = require('./nested-menu.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/nested-menu', new NestedMenu(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('nested-menu');

  service.hooks(hooks);
};
