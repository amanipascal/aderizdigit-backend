const assert = require('assert');
const app = require('../../src/app');

describe('\'mailer2\' service', () => {
  it('registered the service', () => {
    const service = app.service('mailer-2');

    assert.ok(service, 'Registered the service');
  });
});
