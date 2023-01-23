const assert = require('assert');
const app = require('../../src/app');

describe('\'wscomps\' service', () => {
  it('registered the service', () => {
    const service = app.service('wscomps');

    assert.ok(service, 'Registered the service');
  });
});
