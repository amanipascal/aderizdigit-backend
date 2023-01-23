const assert = require('assert');
const app = require('../../src/app');

describe('\'resetPassword\' service', () => {
  it('registered the service', () => {
    const service = app.service('reset-password');

    assert.ok(service, 'Registered the service');
  });
});
