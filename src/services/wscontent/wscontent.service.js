// Initializes the `wscontent` service on path `/wscontent`
const { Wscontent } = require('./wscontent.class');
const createModel = require('../../models/wscontent.model');
const hooks = require('./wscontent.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/wscontent', new Wscontent(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('wscontent');

  service.hooks(hooks);
};
