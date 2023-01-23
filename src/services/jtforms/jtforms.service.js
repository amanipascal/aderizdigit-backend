// Initializes the `jtforms` service on path `/jtforms`
const { Jtforms } = require('./jtforms.class');
const createModel = require('../../models/jtforms.model');
const hooks = require('./jtforms.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/jtforms', new Jtforms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('jtforms');

  service.hooks({
    after: {
      create: (context) => {
        context.app.service('wscomps').create({
          lib: context.result.title,
          api: context.result.url,
          origin_tool: 'jotform',
          width: '100%',
          height: '100%'
        })
      },
      remove: (context)  => {
        context.app.service('wscomps').find({query: {api: context.result.url}}).then(resp => {
          if (!!resp.data.length) {
            context.app.service('wscomps').remove(resp.data[0])
          }
        })
      },
    }
  })

  service.hooks(hooks);
};
