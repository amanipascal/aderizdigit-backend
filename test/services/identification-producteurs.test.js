const assert = require('assert');
const app = require('../../src/app');

describe('\'IdentificationProducteurs\' service', () => {
  it('registered the service', () => {
    const service = app.service('identification-producteurs');

    assert.ok(service, 'Registered the service');
  });
});
