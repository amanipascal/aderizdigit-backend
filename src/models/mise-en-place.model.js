// MiseEnPlace-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'miseEnPlace';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    DateDeCollecte: { type: Date },
    Region: { type: String },
    Departement: { type: String },
    Sous_prefecture: { type: String },
    localite: { type: String },
    Localisation: { type: String },
    MoisDeCollecte: { type: String },
    SemaineDeCollecte: { type: String },
    NomDuSite: { type: String },
    NomDuPerimetre: { type: String },
    NomDuProducteur: { type: String },
    TypeDeRiziculture: { type: String },
    TypeDeVariete: { type: String },
    NomDeVariete: { type: String },
    SuperficieMiseEnPlace: { type: Number },
    PositionGps: { type: String },
    LongitudeGps: { type: String },
    LatitudeGps: { type: String },
    submit_id: { type: String },
    submit_infos: {type: {}}
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
