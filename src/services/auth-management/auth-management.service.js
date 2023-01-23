// Initializes the `auth-management` service on path `/auth-management`
// const { AuthManagement } = require('./auth-management.class');
const hooks = require('./auth-management.hooks');

// const { AuthenticationManagementService, } = require("feathers-authentication-management");
const authManagement = require("feathers-authentication-management");

const notifier = require("./notifier");

module.exports = function (app) {


  // Initialize our service with any options it requires
  // app.use("/auth-management", new AuthenticationManagementService(app, {notifier: notifier(app), })   );
  // app.use("/auth-management", new AuthenticationManagementService(notifier(app)));
  // app.use('/auth-management', new AuthManagement(options, app));
  app.configure(authManagement(notifier(app)));

  // Get our initialized service so that we can register hooks
  const service = app.service('authManagement');

  service.hooks(hooks);
};
