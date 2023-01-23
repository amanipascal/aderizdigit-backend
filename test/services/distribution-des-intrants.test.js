const assert = require('assert');
const app = require('../../src/app');

describe('\'DistributionDesIntrants\' service', () => {
  it('registered the service', () => {
    const service = app.service('distribution-des-intrants');

    assert.ok(service, 'Registered the service');
  });
});
