// Initializes the `verifySignup` service on path `/verify-signup`
const { VerifySignup } = require('./verify-signup.class');
const hooks = require('./verify-signup.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/verify-signup', new VerifySignup(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('verify-signup');

  service.hooks({
    
  })

  service.hooks(hooks);
};
