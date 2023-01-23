const assert = require('assert');
const app = require('../../src/app');

describe('\'identif_pmea\' service', () => {
  it('registered the service', () => {
    const service = app.service('identif-pmea');

    assert.ok(service, 'Registered the service');
  });
});
