const IDoneThis = require('../apis/i-done-this');
const Slack = require('../apis/slack');

module.exports = commander => {
  commander
    .command('slack')
    .description('Posts your list of IDoneThis goals for today in Slack.')
    .action(() => {
      const idt = new IDoneThis({
        token: process.env.IDT_TOKEN,
        teamId: process.env.IDT_TEAM_ID,
        userId: process.env.IDT_USER_ID
      });
      const slack = new Slack({
        slackHook: process.env.IDT_SLACK_HOOK
      });

      idt.getEntries('goal')
        .then(entries => {
          if (!entries.length) {
            console.log('You do not have any goals in IDoneThis for today.');
            process.exit(0);
          }

          slack.postMessage(`My list of goals in IDoneThis for today:\n\n${entries}`);
        })
        .then(() => idt.getEntries())
        .then(entries => console.log(entries.toString()));
    });
};
