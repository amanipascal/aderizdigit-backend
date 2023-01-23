// Initializes the `menu` service on path `/menu`
const { Menu } = require('./menu.class');
const createModel = require('../../models/menu.model');
const hooks = require('./menu.hooks');

let menuBeforePath;

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/menu', new Menu(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('menu');

  service.hooks({
    before: {
      patch: async (context) => {
        const {_id} = context.data;
        if (_id) {
          menuBeforePath = await context.app.service('menu').get(_id)
        }
      }
    },
    after:{
      remove: (context) => {
        const {_id } = context.result
        context.app.service('nested-menu').remove(null, {query: {child_id: _id}})
      },
      create: (context) => {
        const {_id, parentId} = context.result
        if (parentId) {
          context.app.service('nested-menu').create({fathers_id: parentId, child_id: _id })
        }
      },
      patch: (context) => {
        const {_id, parentId} = context.result
        if (menuBeforePath) {
          if (menuBeforePath.parentId != parentId) {
            context.app.service('nested-menu').find({query: {child_id: _id}}).then(resp => {
              console.log('nested to remove : ', resp.data)
              if (resp.data.length != 0) {
                context.app.service('nested-menu').remove(resp.data[0]._id).then(removed => {
                  console.log('nested removed : ', removed)
                  if (parentId) {
                    context.app.service('nested-menu').create({fathers_id: parentId, child_id: _id }).then(rewNested => {
                      console.log('rew Nested: ', rewNested)
                    })
                  }
                })
              } else {
                  if (parentId) {
                    context.app.service('nested-menu').create({fathers_id: parentId, child_id: _id }).then(rewNested => {
                      console.log('rew Nested: ', rewNested)
                    })
                  }
              }
            })
          }
        }
      }
    }
  })

  service.hooks(hooks);
};

  // service.hooks({
  //   before:{
  //     patch: async (context) => {
  //       const data = context.data
  //       const service = context.app.service('menu');
  //       const old_data = await service.get(data._id);
  //       if (data.parentId != old_data.parentId) {
  //         // let parent = await service.get(old_data.parentId)
  //         if (!data.parentId) {
  //           // menu mis a jour n'a plus de parentID (n'est plus sous-menu)
  //           try {

  //             let parent = await service.get(old_data.parentId)
  //             if (parent.children.length > 1) {
               
  //               service.patch(parent._id, {...parent, children: [ ...old_data.children.filter(child => child != old_data._id)  ]})
  //             } else {
               
  //               service.patch(parent._id, {...parent , hasChildren: false, children: []})
  //             }
  //           } catch (error) {
  //             console.log('error maj 1 ==> ', error)
  //           }

  //         } else {
  //           // menu mis a jour a un autre parentID (est sous-menu d'un autre menu)
  //           // Il faut quitter l'ancien parent
  //           let parent = await service.get(old_data.parentId)
  //           if (parent.children.length > 1) {
  //             service.patch(old_data.parentId, {children: [ ...old_data.children.filter(child => child != old_data._id)  ]})
  //           } else {
  //             service.patch(old_data.parentId, {hasChildren: false, children: []})
  //           }
  //           // Ensuite se referencer au nouveau parent
  //           let new_parent = await service.get(data.parentId)
  //           if (new_parent) {
  //             try {
  //               if (new_parent.children) {
  //                 service.patch(new_parent._id, {hasChildren: true, children: [...new_parent.children, data._id] })
  //               } else {
  //                 service.patch(new_parent._id, {hasChildren: true, children: [data._id] })
  //               }
  //             } catch (error) {
  //               console.log('error maj ==> ', error)
  //             }
  //           }

  //         }
  //       }
  //     }
  //   },
  //   after: {
  //     create: async (context) => {
  //       const result = context.result
  //       if (result.parentId) {
  //         const service = context.app.service('menu');
  //         const parent = await service.get(result.parentId)
  //         if (parent) {
  //           try {
  //             if (parent.children) {
  //               service.patch(result.parentId, {hasChildren: true, children: [...parent.children, result._id] })
  //             } else {
  //               service.patch(result.parentId, {hasChildren: true, children: [result._id] })
  //             }
  //           } catch (error) {
  //             console.log('error ==> ', error)
  //           }
  //         }
  //       }
  //     }
  //   }
  // })


