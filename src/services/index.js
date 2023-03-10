const users = require('./users/users.service.js');
const profil = require('./profil/profil.service.js');
const menu = require('./menu/menu.service.js');
const ws = require('./ws/ws.service.js');
const wscomps = require('./wscomps/wscomps.service.js');
const wscontent = require('./wscontent/wscontent.service.js');
const nestedMenu = require('./nested-menu/nested-menu.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const mailer = require('./mailer/mailer.service.js');
const mailer2 = require('./mailer2/mailer2.service.js');
const verifySignup = require('./verify-signup/verify-signup.service.js');
const forgotPassword = require('./forgot-password/forgot-password.service.js');
const resetPassword = require('./reset-password/reset-password.service.js');
const userService = require('./user-service/user-service.service.js');
const identifPerimetre = require('./identif_perimetre/identif_perimetre.service.js');
const jtforms = require('./jtforms/jtforms.service.js');
const collectePrixRiz = require('./collecte_prix_riz/collecte_prix_riz.service.js');
const identifPmea = require('./identif_pmea/identif_pmea.service.js');
const indentificationOpa = require('./indentification-opa/indentification-opa.service.js');
const distributionDesIntrants = require('./distribution-des-intrants/distribution-des-intrants.service.js');
const identificationProducteurs = require('./identification-producteurs/identification-producteurs.service.js');
const miseEnPlace = require('./mise-en-place/mise-en-place.service.js');
const transformation = require('./transformation/transformation.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(profil);
  app.configure(menu);
  app.configure(ws);
  app.configure(wscomps);
  app.configure(wscontent);
  app.configure(nestedMenu);
  app.configure(authManagement);
  app.configure(mailer);
  app.configure(mailer2);
  app.configure(verifySignup);
  app.configure(forgotPassword);
  app.configure(resetPassword);
  app.configure(userService);
  app.configure(identifPerimetre);
  app.configure(jtforms);
  app.configure(collectePrixRiz);
  app.configure(identifPmea);
  app.configure(indentificationOpa);
  app.configure(distributionDesIntrants);
  app.configure(identificationProducteurs);
  app.configure(miseEnPlace);
  app.configure(transformation);
};
