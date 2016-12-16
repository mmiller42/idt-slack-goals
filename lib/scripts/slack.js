const IDoneThis = require('../apis/i-done-this');
const Slack = require('../apis/slack');

module.exports = commander => {
  commander
    .command('slack')
    .description('Posts your list of IDoneThis goals for today in Slack.')
    .arguments('[type]')
    .action(type => {
      type = type ? type.trim().toLowerCase() : null;
      if ([null, 'goal', 'done'].indexOf(type) === -1) {
        throw new Error('The type argument must be `goal`, `done`, or omitted.');
      }

      const idt = new IDoneThis({
        token: process.env.IDT_TOKEN,
        teamId: process.env.IDT_TEAM_ID,
        userId: process.env.IDT_USER_ID
      });
      const slack = new Slack({
        slackHook: process.env.IDT_SLACK_HOOK
      });

      idt.getEntries(type)
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
