// Initializes the `cillecte_prix_riz` service on path `/collecte_prix_riz`
const { CollectePrixRiz } = require('./collecte_prix_riz.class');
const createModel = require('../../models/collecte_prix_riz.model');
const hooks = require('./collecte_prix_riz.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/collecte_prix_riz', new CollectePrixRiz(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('collecte_prix_riz');
  service.hooks({
    before: {
      create: (context => {
        let {DateDeCollecte, Localisation, PositionGPS, ...rest} = context.data;
        const locallist = Localisation ? Localisation.split('\r\n').slice(-4) : [];
        const localisation = !!locallist.length ? locallist.join(';') : ""
        const datecol = DateDeCollecte.datetime;
        const region = !!locallist.length ? locallist[0] : "";
        const departement = !!locallist.length ? locallist[1]: "";
        const ssprefect = !!locallist.length ? locallist[2]: "";
        const localite = !!locallist.length ?  locallist[3]: "";
        const LongitudeGps = PositionGPS ? PositionGPS.split('\r\n')[0].split(':')[1] :"";
        const LatitudeGps = PositionGPS ? PositionGPS.split('\r\n')[1].split(':')[1] : "";
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
          localite
        } 
        return context 
      })
    }
  })


  service.hooks(hooks);
};
