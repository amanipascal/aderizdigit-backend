// IndentificationOPA-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'indentificationOpa';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    DateDeCollecte: { type: Date },
    Region: { type: String },
    Departement: { type: String },
    Sous_prefecture: { type: String },
    localite: { type: String },
    Localisation: { type: String },
    TypeDopa: { type: String },
    NomDopa: { type: String },
    NomEtPrenomPresid: { type: String },
    Contact: { type: String },
    SigleDopa: { type: String },
    TypeDeRiziculture: { type: String },
    superficie_exploitable: { type: Number },
    NombreDeSections: { type: Number },
    NombreDeMembres: { type: Number },
    Superficie: { type: Number },
    ZoneDintervention: { type: String },
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
