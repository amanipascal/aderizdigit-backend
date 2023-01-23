const { authenticate } = require('@feathersjs/authentication').hooks;

const { shallowPopulate } = require('feathers-shallow-populate')


const options = {
  include: [
    {
      service: 'menu',
      nameAs: 'profil_menus',
      keyHere: 'menus',
      keyThere: '_id',
      asArray: true, // by default
      params: {} // by default
    },
   
  ]
}



module.exports = {
  before: {
    all: [ ], // authenticate('jwt') 
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [shallowPopulate(options)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
