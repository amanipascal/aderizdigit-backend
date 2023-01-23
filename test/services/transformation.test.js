const assert = require('assert');
const app = require('../../src/app');

describe('\'Transformation\' service', () => {
  it('registered the service', () => {
    const service = app.service('transformation');

    assert.ok(service, 'Registered the service');
  });
});
