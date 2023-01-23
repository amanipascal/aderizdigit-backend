const assert = require('assert');
const app = require('../../src/app');

describe('\'verifySignup\' service', () => {
  it('registered the service', () => {
    const service = app.service('verify-signup');

    assert.ok(service, 'Registered the service');
  });
});
