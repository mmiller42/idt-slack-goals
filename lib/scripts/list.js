const IDoneThis = require('../apis/i-done-this');

module.exports = commander => {
  commander
    .command('list')
    .description('Lists your goals and accomplishments in IDoneThis for today.')
    .action(() => {
      const idt = new IDoneThis({
        token: process.env.IDT_TOKEN,
        teamId: process.env.IDT_TEAM_ID,
        userId: process.env.IDT_USER_ID
      });

      idt.getEntries().then(entries => console.log(entries.toString()));
    });
};
