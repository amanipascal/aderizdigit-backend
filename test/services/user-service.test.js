const assert = require('assert');
const app = require('../../src/app');

describe('\'user-service\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-service');

    assert.ok(service, 'Registered the service');
  });
});
