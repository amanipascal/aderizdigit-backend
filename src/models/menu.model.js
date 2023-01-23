// menu-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'menu';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    lib: { type: String, required: true },
    parentId: { type: String },
    ordre: { type: Number, default: 0 },
    wsdesignation: { type: String, required: true },
    wsdescription: { type: String },
  }, {
    timestamps: true
  });
  // children: [Schema.Types.Mixed],
  // hasChildren: { type: Boolean,  default: false },
  // children: [Schema.Types.ObjectId],
  // wscomps: [Schema.Types.ObjectId ], // cle etrangere de work space
  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
