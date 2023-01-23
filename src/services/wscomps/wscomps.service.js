// Initializes the `wscomps` service on path `/wscomps`
const { Wscomps } = require('./wscomps.class');
const createModel = require('../../models/wscomps.model');
const hooks = require('./wscomps.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/wscomps', new Wscomps(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('wscomps');

  service.hooks(hooks);
};
