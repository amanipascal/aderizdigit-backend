// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  let menus = []

  const loadmenus = async (context) => {
      const result = await context.app.service('menu').find({});
      menus = result.data
  }

  service.hooks({
    before: {
      // find:(context) => {
      //   loadmenus(context)
      // },
      // get:(context) => {
      //   loadmenus(context)
      // },
    },
    after: {
      // find: (context) => {
      //   // console.log("context.result : ", context.result) 
      //    context.result.data.map(item => {
      //     const ItemMenus = item.menus
      //     console.log('ItemMenus: ', ItemMenus)
      //     const newItem = {
      //       ...item, menus: menus.find((m) => {
      //         console.log('m: ', m)
      //         return ItemMenus.includes(m._id)
      //       })
      //     }
      //     return newItem
      //   })
        
      // }

    }
  })

  service.hooks(hooks);
};
