const IDoneThis = require('../apis/i-done-this');

module.exports = commander => {
  commander
    .command('complete')
    .description('Marks the first goal matched by the search as complete.')
    .arguments('<search>')
    .action(search => {
      const idt = new IDoneThis({
        token: process.env.IDT_TOKEN,
        teamId: process.env.IDT_TEAM_ID,
        userId: process.env.IDT_USER_ID
      });

      idt.getEntryContaining(search, 'goal')
        .then(entry => {
          if (!entry) {
            console.log(`No goal found for today matching \`${search}\`.`);
            process.exit(0);
          }
          return entry;
        })
        .then(entry => Object.assign(entry, {status: 'done'}))
        .then(entry => idt.updateEntry(entry))
        .then(entries => console.log(entries.toString()));
    });
};
