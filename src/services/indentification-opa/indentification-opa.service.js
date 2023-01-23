// Initializes the `IndentificationOPA` service on path `/indentification-opa`
const { IndentificationOpa } = require('./indentification-opa.class');
const createModel = require('../../models/indentification-opa.model');
const hooks = require('./indentification-opa.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/indentification-opa', new IndentificationOpa(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('indentification-opa');

  service.hooks({
    before: {
      create: (context => {
        let {DateDeCollecte, Localisation, PositionGPS, Contact, ...rest} = context.data;
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
          Contact: Contact ? Contact.full : ""
        } 
        return context 
      })
    }
  })


  service.hooks(hooks);
};
