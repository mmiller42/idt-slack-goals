const fetch = require('isomorphic-fetch');

const USER_ID = process.env.IDT_USER_ID;
const API_KEY = process.env.IDT_API_KEY;
const SLACK_HOOK = process.env.IDT_SLACK_HOOK;

if (!USER_ID) throw new Error('Must define `IDT_USER_ID` in environment.');
if (!API_KEY) throw new Error('Must define `IDT_API_KEY` in environment.');
if (!SLACK_HOOK) throw new Error('Must define `IDT_SLACK_HOOK` in environment.');

process.on('unhandledRejection', err => { throw err; });

const now = new Date();
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

function pad(n) { return n < 10 ? '0' + n : n; }

fetch(
  'https://beta.idonethis.com/api/v2/entries',
  {
    headers: {
      Authorization: `Token ${API_KEY}`
    }
  }
)
  .then(response => response.json())
  .then(entries => {
    if (entries.error) throw new Error(entries.error);

    const list = entries
      .filter(entry => entry.user.hash_id === USER_ID && entry.occurred_on === today && entry.status === 'goal')
      .map(entry => `* ${entry.body}`)
      .join('\n');

    if (!list) throw new Error('No goals in IDT today.');

    const message = `My list of goals in I Done This for today:\n\n${list}`;

    fetch(
      `https://hooks.slack.com/services/${SLACK_HOOK}`,
      {
        method: 'POST',
        body: JSON.stringify({text: message})
      }
    )
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        console.log('Posted to Slack');
      });
  });
