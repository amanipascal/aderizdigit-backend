// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.


module.exports = function (app) {
  const modelName = 'users';
  
  const mongooseClient = app.get('mongooseClient');
  
  const { Schema } = mongooseClient;

  const schema = new Schema({

    email: { type: String, unique: true, lowercase: true },

    username: { type: String },

    password: { type: String },

    service_id: { type: Schema.Types.ObjectId } ,
  
    auth0Id: { type: String },
  
    googleId: { type: String },
  
    facebookId: { type: String },
  
    twitterId: { type: String },

    profils: [Schema.Types.ObjectId],

    menus: [Schema.Types.ObjectId],

    menus_interdits: [Schema.Types.ObjectId],

    isVerified:  { type: Boolean }, //Indicates if the user's e-mail address has been verified.

    verifyToken:  { type: String }, // A long verification token generated for verification e-mails

    verifyExpires:  { type: Date|Number }, // Expiration date of the verification token.

    // verifyChanges: [], // An array that tracks e. g. the change of an e-mail address.

    // verifyShortToken: { type: String }, // A short verification token generated e. g. for verification SMS.

    resetToken: { type: String }, // A long reset token generated for password reset e-mails.

    // resetShortToken: { type: String }, //A short reset token generated e. g. for password reset SMS.

    resetExpires: { type: Date|Number }, //Expiration date of the reset token.

    // resetAttempts: { type: Number }  // Amount of incorrect reset submissions left before token invalidation.

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
