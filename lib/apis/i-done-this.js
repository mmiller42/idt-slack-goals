const fetch = require('isomorphic-fetch');
const emojis = require('emojis');

const API_URI = 'https://beta.idonethis.com/api/v2/';
const DONE = emojis.unicode(':ballot_box_with_check:');
const GOAL = emojis.unicode(':white_medium_square:');

module.exports = class IDoneThis {
  constructor (config = {}) {
    if (!config.token) throw new Error('No IDoneThis token defined!');
    if (!config.teamId) throw new Error('No IDoneThis team ID defined!');
    if (!config.userId) throw new Error('No IDoneThis user ID defined!');
    this.config = config;
    this.today = (() => {
      const date = new Date();
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
      function pad(n) { return n < 10 ? `0${n}` : n; }
    })();
  }

  getEntries (status) {
    return fetch(`${API_URI}entries?team_id=${this.config.teamId}`, {
      headers: {Authorization: `Token ${this.config.token}`}
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.statusText}\n${JSON.stringify(response.body)}`);
        }
        return response;
      })
      .then(response => response.json())
      .then(entries => {
        const yourEntries = entries.filter(entry => {
          return entry.user.hash_id === this.config.userId
            && entry.occurred_on === this.today
            && (!status || entry.status === status);
        });

        yourEntries.toString = function () {
          return this.map(entry => `${entry.status === 'done' ? DONE : GOAL}  ${entry.body}`)
            .join('\n');
        };

        return yourEntries;
      });
  }

  getEntryContaining (search, status) {
    search = search.trim().toLowerCase();
    return this.getEntries(status)
      .then(entries => entries.find(entry => entry.body.toLowerCase().indexOf(search) > -1));
  }

  updateEntry (entry) {
    return fetch(`${API_URI}entries/${entry.hash_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.config.token}`
      },
      method: 'PUT',
      body: JSON.stringify(entry)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.statusText}\n${JSON.stringify(response.body)}`);
        }
        return response;
      })
      .then(() => this.getEntries());
  }

  createEntry (body, status) {
    return fetch(`${API_URI}entries`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.config.token}`
      },
      method: 'POST',
      body: JSON.stringify({
        body: body,
        team_id: this.config.teamId,
        occurred_on: this.today,
        status: status
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.statusText}\n${JSON.stringify(response.body)}`);
        }
        return response;
      })
      .then(() => this.getEntries());
  }
};
