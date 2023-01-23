const assert = require('assert');
const app = require('../../src/app');

describe('\'jtforms\' service', () => {
  it('registered the service', () => {
    const service = app.service('jtforms');

    assert.ok(service, 'Registered the service');
  });
});
