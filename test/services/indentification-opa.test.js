const assert = require('assert');
const app = require('../../src/app');

describe('\'IndentificationOPA\' service', () => {
  it('registered the service', () => {
    const service = app.service('indentification-opa');

    assert.ok(service, 'Registered the service');
  });
});
