const assert = require('assert');
const app = require('../../src/app');

describe('\'note_eleve\' service', () => {
  it('registered the service', () => {
    const service = app.service('note-eleve');

    assert.ok(service, 'Registered the service');
  });
});
