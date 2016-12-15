const fetch = require('isomorphic-fetch');

const API_URI = 'https://hooks.slack.com/services/';

module.exports = class Slack {
  constructor (config = {}) {
    if (!config.slackHook) throw new Error('No Slack hook defined!');
    this.config = config;
  }

  postMessage (message) {
    return fetch(`${API_URI}${this.config.slackHook}`,
      {
        method: 'POST',
        body: JSON.stringify({text: message})
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.statusText}\n${JSON.stringify(response.body)}`);
        }
      });
  }
};
