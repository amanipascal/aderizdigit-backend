const assert = require('assert');
const app = require('../../src/app');

describe('\'wscontent\' service', () => {
  it('registered the service', () => {
    const service = app.service('wscontent');

    assert.ok(service, 'Registered the service');
  });
});
