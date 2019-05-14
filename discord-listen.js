client.on('message', message => {
  if (!message.content.startsWith(config.discordPrefix)) return;
  if (!message.channel.id === config.discordChannelId) return;
  const args = message.content.slice(config.discordPrefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'alert') {
    const invalidChars = /[ A-z!✓•▪►”–@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (args.length < 3) {
      message.channel.send('Missing arguments');
    } else if (!invalidChars.test(args[0])) {
      message.channel.send('Command is ".alert <ArticleId> <Number> <Correct spelling>"');
    } else if (isNaN(args[1])) {
      message.channel.send('The misspelled word must be an integer');
    } else {
      alertAftonbladet(args);
    }
  }

  if (command === 'deny') {
    message.channel.send('Denying!');
  }

  if (command === 'addword') {
    const invalidChars = /[ a-z!✓•▪►”–@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (args.length < 2) {
      message.channel.send('Missing argument');
    } else if (!invalidChars.test(args[0])) {
      message.channel.send('Command is ".addword <ArticleId> <Number>"');
    } else {
      updateArticleError(args, true); // Update the article AND add the words
    }
  }

  if (command === 'ignore') {
    const invalidChars = /[ !✓•▪►”–@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (args.length < 2) {
      message.channel.send('Missing argument');
    } else if (!invalidChars.test(args[0])) {
      message.channel.send('Command is ".ignore <ArticleId> <Number>"');
    } else {
      updateArticleError(args, false); // Update the article and IGNORE the words
    }
  }

  if (command === 'clear') {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
      var i;
      for (i = 0; i < 5; i++) {
        message.channel.fetchMessages()
          .then(function (list) {
            console.log('cleaning');
            message.channel.bulkDelete(list);
          }, function (err) { throw err; });
      }
    }
  }
});
