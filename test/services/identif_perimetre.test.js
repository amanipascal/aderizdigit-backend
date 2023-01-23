const assert = require('assert');
const app = require('../../src/app');

describe('\'identif_perimetre\' service', () => {
  it('registered the service', () => {
    const service = app.service('identif-perimetre');

    assert.ok(service, 'Registered the service');
  });
});
