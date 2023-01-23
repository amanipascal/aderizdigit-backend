// identif_pmea-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'IdentificationPmea';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    DateDeCollecte: { type: Date },
    Region: { type: String },
    Departement: { type: String },
    Sous_prefecture: { type: String },
    localite: { type: String },
    Localisation: { type: String },
    NomPmea: { type: String },
    TypePmea: { type: String },
    NomDuResponsable: { type: String },
    contact: { type: String },
    zoneDintervention: { type: String },
    NombreDeGerant: { type: Number },
    NombreDeComptable: { type: Number },
    NombreDeGestParc: { type: Number },
    NombreDeMaintenMateriel: { type: Number },
    NombreDeMachiniste: { type: Number },
    NombreDeOperateurs: { type: Number },
    NiveauDetudeGerant: { type: String },
    NiveauDetudeComptable: { type: String },
    NiveauDetudeGestionParc: { type: String },
    NiveauDetudeMaintenancier: { type: String },
    NiveauDetudeMachiniste: { type: String },
    NiveauDetudeOperateur: { type: String },
    AnneeDexperienceGerant: { type: Number },
    AnneeDexperienceComptable: { type: Number },
    AnneeDexperienceGestionParc: { type: Number },
    AnneeDexperienceMaintenancier: { type: Number },
    AnneeDexperienceMachiniste: { type: Number },
    NombreTracteur75CV: { type: Number },
    NombreTracteur4045CV: { type: Number },
    NombreMotoculteurs: { type: Number },
    NombreFaucheuses: { type: Number },
    NombreMoissonneuseBateuses: { type: Number },
    nombreMiniMoissonneusebateuses: { type: Number },
    NombreBatteusevaneuse: { type: Number },
    CoutPrestationLabour: { type: Number },
    CoutPrestationPulverisage: { type: Number },
    CoutPrestationRecolte: { type: Number },
    CoutPrestationBattage: { type: Number },
    CoutPrestationMoissonnage: { type: Number },
    PositionGPS: { type: String },
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
