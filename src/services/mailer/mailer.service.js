
const hooks = require('./mailer.hooks');

const Mailer = require('feathers-mailer');
// const nodemailer = require('nodemailer');
// const mailjetTransport = require('nodemailer-mailjet-transport');
const smtpTransport = require('nodemailer-smtp-transport');



// const Mjtransport = nodemailer.createTransport(mailjetTransport({
//   auth: {
//     apiKey: '941f7b8ad50abf026166a9ab5fcfd137',
//     apiSecret: 'baa6c5b54dc693d06855cf27109eeed2'
//   }
// }));





module.exports = function (app) {
 
  // Initialize our service with any options it requires
  app.use('/mailer', Mailer(smtpTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD
    }
  })));
  // app.use('/mailer', Mailer(mailjetTransport(Mjtransport)));

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
