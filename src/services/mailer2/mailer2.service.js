// Initializes the `mailer2` service on path `/mailer-2`
const { Mailer2 } = require('./mailer2.class');
const hooks = require('./mailer2.hooks');

const nodemailer = require('nodemailer');

const mailjetTransport = require('nodemailer-mailjet-transport');

const transport = nodemailer.createTransport(mailjetTransport({
  auth: {
    apiKey: process.env.MAILJET_APIKEY,
    apiSecret: process.env.MAILJET_APISECRET
  }
}));


module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mailer-2', new Mailer2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer-2');

  service.hooks({
    after: {
      create: async (context) => {
        try {
          transport.sendMail(context.data)
          context.result = {status: 'success', errName: "", msg: context.data}
          return context
        } catch (error) {
          context.result = {status: 'error', errName: "EmailNotSent", msg: error}
          return context
        }
      }
    }
  })

  service.hooks(hooks);
};
