// jtforms-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'jtforms';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    id: { type: String, required: true },
    username: { type: String },
    title: { type: String },
    status: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    last_submission: { type: Date },
    new: { type: String },
    count: { type: String },
    type: { type: String },
    favorite: { type: String },
    archived: { type: String },
    url: { type: String },
    crud_service:{ type: String, default:"undefined" },
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
