// Initializes the `identif_pmea` service on path `/identif-pmea`
const { IdentifPmea } = require('./identif_pmea.class');
const createModel = require('../../models/identif_pmea.model');
const hooks = require('./identif_pmea.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/identif-pmea', new IdentifPmea(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('identif-pmea'); 
  service.hooks({
    before: {
      create: (context => {
        let {DateDeCollecte, Localisation, PositionGPS, contact, ...rest} = context.data;
        const locallist = Localisation ? Localisation.split('\r\n').slice(-4) : [];
        const localisation = locallist.join(';')
        const datecol = DateDeCollecte.datetime;
        const region = locallist[0];
        const departement = locallist[1]
        const ssprefect = locallist[2]
        const localite = locallist[3]
        const LongitudeGps = PositionGPS ? PositionGPS.split('\r\n')[0].split(':')[1] : "";
        const LatitudeGps = PositionGPS ? PositionGPS.split('\r\n')[1].split(':')[1]: "";
        context.data = {
          ...rest, 
          Localisation: localisation, 
          DateDeCollecte: datecol,
          PositionGPS: PositionGPS ? PositionGPS.split('\r\n').join(';') : "",
          LongitudeGps,
          LatitudeGps,
          Region: region,
          Departement: departement,
          Sous_prefecture: ssprefect,
          localite,
          contact: contact ? contact.full : ""
        } 
        return context 
      })
    }
  })

  service.hooks(hooks);
};
