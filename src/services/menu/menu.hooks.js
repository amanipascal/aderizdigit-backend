const { authenticate } = require('@feathersjs/authentication').hooks;

const { shallowPopulate } = require('feathers-shallow-populate')


const options = {
  include: [
    {
      service: 'nested-menu',
      nameAs: 'nested',
      keyHere: '_id',
      keyThere: 'fathers_id',
      asArray: true, // by default
      params: {} // by default
    },
    {
      service: 'wscontent',
      nameAs: 'wscontent',
      keyHere: '_id',
      keyThere: 'menu',
      asArray: true, // by default
      params: {} // by default
    }
  ]
}


module.exports = {
  before: {
    all: [ 
      //  authenticate('jwt')
     ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
