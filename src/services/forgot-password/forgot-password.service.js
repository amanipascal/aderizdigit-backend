// Initializes the `forgotPassword` service on path `/forgot-password`
const { ForgotPassword } = require('./forgot-password.class');
const hooks = require('./forgot-password.hooks');
const jwt = require('jsonwebtoken');
const EmailBuilder = require('../auth-management/Email_builder')

const signToken = (id) => {
  return jwt.sign({ id: id },  process.env.PWD_RESET_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = function (app) {
  const options = {
  };
  
  // Initialize our service with any options it requires
  app.use('/forgot-password', new ForgotPassword(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('forgot-password');

  service.hooks({
    after: {
      create: async (context) => {
        const {email} = context.data;
        const resp = await context.app.service('users').find({query: {email:email}})
        if (!!resp.data.length) {
              const {_id} = resp.data[0];
              const token = signToken(_id);
              const tokenExp = jwt.decode(token, { complete: true }).payload.exp;
              const patchData = { resetToken: token, resetExpires: tokenExp }
              const user = await context.app.service('users').patch(_id, patchData)
              try {
                const EmailToSend = EmailBuilder("sendResetPwd","resetPwdLong", user)()
                const mail_back = await app.service("mailer-2").create(EmailToSend)
                context.result = {...mail_back}
                return context
              } catch (error) {
                context.result = {status: 'error',  errName: 'EmailNotSent', msg: error}
                return context
              }
          } else {
            context.result = {status: 'error', errName: 'UserNotFound'}
            return context
          }
      }
    }
  })

  service.hooks(hooks);
};
