const { authenticate } = require('@feathersjs/authentication').hooks;

const { shallowPopulate } = require('feathers-shallow-populate')


const options = {
  include: [
    {
      service: 'menu',
      nameAs: 'child',
      keyHere: 'child_id',
      keyThere: '_id',
      asArray: false, // by default
      params: {} // by default
    }
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
