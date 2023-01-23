// Initializes the `Transformation` service on path `/transformation`
const { Transformation } = require('./transformation.class');
const createModel = require('../../models/transformation.model');
const hooks = require('./transformation.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/transformation', new Transformation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transformation');

  
  service.hooks({
    before: {
      create: (context => {
        let {DateDeCollecte, Localisation, PositionGps, Contact, ...rest} = context.data;
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
          localite,
          Contact: Contact ? Contact.full : ""
        } 
        return context 
      })
    }
  })

  service.hooks(hooks);
};
