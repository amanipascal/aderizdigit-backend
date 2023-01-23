const assert = require('assert');
const app = require('../../src/app');

describe('\'MiseEnPlace\' service', () => {
  it('registered the service', () => {
    const service = app.service('mise-en-place');

    assert.ok(service, 'Registered the service');
  });
});
