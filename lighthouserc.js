/* eslint-disable @typescript-eslint/no-var-requires */

const isCI = require('is-ci');

const config = {
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        canonical: 'off',
      },
    },
  },
};

if (isCI) {
  module.exports = {
    ci: {
      ...config.ci,
      assert: {
        ...config.ci.assert,
        assertions: {
          ...config.ci.assert.assertions,
          'is-crawlable': 'off',
        },
      },
    },
  };
} else {
  module.exports = {
    ci: {
      ...config.ci,
      collect: {
        url: ['http://localhost:3000'],
        startServerCommand: 'npm run start',
      },
    },
  };
}
