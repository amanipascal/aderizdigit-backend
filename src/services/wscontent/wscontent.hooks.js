const { authenticate } = require('@feathersjs/authentication').hooks;

const { shallowPopulate } = require('feathers-shallow-populate')

const options = {
  include: [
    // {
    //   service: 'menu',
    //   nameAs: 'menuObj',
    //   keyHere: 'menu',
    //   keyThere: '_id',
    //   asArray: false, // by default
    //   params: {} // by default
    // },
    {
      service: 'wscomps',
      nameAs: 'wscompList',
      keyHere: 'wscomps',
      keyThere: '_id',
      asArray: true, // by default
      params: {} // by default
    },
  ]
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      shallowPopulate(options)
    ],
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
