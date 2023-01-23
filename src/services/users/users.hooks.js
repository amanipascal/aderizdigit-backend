const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const { shallowPopulate } = require('feathers-shallow-populate')

const { addVerification, isVerified, removeVerification } = require("feathers-authentication-management");


const authNotifier = require("../auth-management/notifier");

const {
  disallow,
  iff,
  isProvider,
  preventChanges,
} = require("feathers-hooks-common");



const sendVerify = async () => {

  return async (context) => {

    const notifier = authNotifier(context.app);
    await notifier("resendVerifySignup", context.result)
    // new Promise(async user => notifier("resendVerifySignup", user))

    // const users = Array.isArray(context.result) 
    //   ? context.result
    //   : [context.result];

    // await Promise.all(
    //   users.map(async user => notifier("resendVerifySignup", user))
    // )

  };
}

const options = {
  include: [
    {
      service: 'profil',
      nameAs: 'user_profils',
      keyHere: 'profils',
      keyThere: '_id',
      asArray: true, // by default
      params: {} // by default
    },
    {
      service: 'menu',
      nameAs: 'user_menus',
      keyHere: 'menus',
      keyThere: '_id',
      asArray: true, // by default
      params: {} // by default
    },
    {
      service: 'user-service',
      nameAs: 'service',
      keyHere: 'service_id',
      keyThere: '_id',
      asArray: false, // by default
      params: {} // by default
    },
    
  ]
}

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [],
    create: [ hashPassword('password'), addVerification() ],
    update: [disallow("external"), hashPassword('password'), authenticate('jwt')  ], // 
    patch: [ 
      authenticate('jwt'),
      iff(
        isProvider("external"),
        preventChanges(
          true,
          "_id",
          "isVerified",
          "resetExpires",
          "resetShortToken",
          "resetToken",
          "verifyChanges",
          "verifyExpires",
          "verifyShortToken",
          "verifyToken",
        )
      ),
      hashPassword('password')
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      shallowPopulate(options),
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      context => { 
        authNotifier(context.app)('resendVerifySignup', context.result)
        return context;
      },
      removeVerification(),
    ],
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
