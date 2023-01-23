const assert = require('assert');
const app = require('../../src/app');

describe('\'cillecte_prix_riz\' service', () => {
  it('registered the service', () => {
    const service = app.service('collecte_prix_riz');

    assert.ok(service, 'Registered the service');
  });
});
