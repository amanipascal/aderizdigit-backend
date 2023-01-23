// Initializes the `IdentificationProducteurs` service on path `/identification-producteurs`
const { IdentificationProducteurs } = require('./identification-producteurs.class');
const createModel = require('../../models/identification-producteurs.model');
const hooks = require('./identification-producteurs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/identification-producteurs', new IdentificationProducteurs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('identification-producteurs');

  service.hooks({
    before: {
      create: (context => {
        let {DateDeCollecte, Localisation, PositionGps, ...rest} = context.data;
        const locallist = Localisation ? Localisation.split('\r\n').slice(-4) : [];
        const localisation = !!locallist.length ? locallist.join(';') : ""
        const datecol = DateDeCollecte.datetime;
        const region = !!locallist.length ? locallist[0] : "";
        const departement = !!locallist.length ? locallist[1]: "";
        const ssprefect = !!locallist.length ? locallist[2]: "";
        const localite = !!locallist.length ?  locallist[3]: "";
        const LongitudeGps = PositionGps ? PositionGps.split('\r\n')[0].split(':')[1] :"";
        const LatitudeGps = PositionGps ? PositionGps.split('\r\n')[1].split(':')[1] : "";
        context.data = {
          ...rest, 
          Localisation: localisation, 
          DateDeCollecte: datecol,
          PositionGps: PositionGps ? PositionGps.split('\r\n').join(';') : "",
          LongitudeGps,
          LatitudeGps,
          Region: region,
          Departement: departement,
          Sous_prefecture: ssprefect,
          localite
        } 
        return context 
      })
    }
  })


  service.hooks(hooks);
};
