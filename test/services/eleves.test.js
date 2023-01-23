const assert = require('assert');
const app = require('../../src/app');

describe('\'eleves\' service', () => {
  it('registered the service', () => {
    const service = app.service('eleves');

    assert.ok(service, 'Registered the service');
  });
});
