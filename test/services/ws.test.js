const assert = require('assert');
const app = require('../../src/app');

describe('\'ws\' service', () => {
  it('registered the service', () => {
    const service = app.service('ws');

    assert.ok(service, 'Registered the service');
  });
});
