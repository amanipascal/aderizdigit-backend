/* eslint-disable no-unused-vars */
// const nodemailer = require('nodemailer');

// const mailjetTransport = require('nodemailer-mailjet-transport');

// const transport = nodemailer.createTransport(mailjetTransport({
//   auth: {
//     apiKey: '941f7b8ad50abf026166a9ab5fcfd137',
//     apiSecret: 'baa6c5b54dc693d06855cf27109eeed2'
//   }
// }));

exports.Mailer2 = class Mailer2 {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
