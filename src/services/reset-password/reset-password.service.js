// Initializes the `resetPassword` service on path `/reset-password`
const { ResetPassword } = require('./reset-password.class');
const hooks = require('./reset-password.hooks');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reset-password', new ResetPassword(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reset-password');

  service.hooks({
    before: {
      create: async (context) => {
        const {resetToken, password} = context.data
        if (resetToken) {
          try {
            const JwtVerified = jwt.verify(resetToken, process.env.PWD_RESET_SECRET)
            const user = await context.app.service('users').get(JwtVerified.id);
            if (user) {
              try {
                await context.app.service('users').patch(user._id, {password, resetToken: null, resetExpires:null})
                context.result = {status: 'success', errName: null, msg: 'Votre mot de passe a été re-initialisé avec succes.'}
                return context;
              } catch (error) {
                context.result = {status: 'error', errName:'ResetFailed' , msg: 'La re-initialisation de votre mot de passe a échoué.'}
                return context;
              }
              
            }
          } catch (error) {
            // console.log('jwtVerify Error: ', error.TokenExpiredError)
            context.result = {status: 'error', errName: 'TokenIvalid', msg: 'Token Expiré ou Invalid'}
            return context;
          }
        } else {
          context.result = {status: 'error', errName:'TokenIvalid' , msg: 'Token inexistant ou invalid'}
          return context;
        }
      }
    }
  })

  service.hooks(hooks);
};
