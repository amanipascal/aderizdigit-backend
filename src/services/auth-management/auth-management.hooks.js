

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // (context) => {
      //   console.log('context.data ', context.data)
      // }
  ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        console.log('context.result ', context.result)
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      (context) => {
        console.log('context.error ', context.error)
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
