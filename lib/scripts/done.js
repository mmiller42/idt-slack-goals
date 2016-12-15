const IDoneThis = require('../apis/i-done-this');

module.exports = commander => {
  commander
    .command('done')
    .description('Adds an item to your list of accomplishments in IDoneThis.')
    .arguments('<entry>')
    .action(entry => {
      const idt = new IDoneThis({
        token: process.env.IDT_TOKEN,
        teamId: process.env.IDT_TEAM_ID,
        userId: process.env.IDT_USER_ID
      });

      idt.createEntry(entry, 'done').then(entries => console.log(entries.toString()));
    });
};
