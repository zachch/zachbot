/*

Start of the Zachbot conversation

*/

module.exports = function(controller) {

  controller.api.messenger_profile.greeting('Zachbot at your service');
  controller.on('facebook_postback', function(bot, message) {

    bot.createConversation(message, function(err, convo) {

      // create a path for when a user says YES
      convo.addMessage({
        text: 'You answered yes... that is wrong',
      },'yes_thread');

      // create a path for when a user says NO
      // mark the conversation as unsuccessful at the end
      convo.addMessage({
        text: 'You answered no, that is correct',
        action: 'stop', // this marks the converation as unsuccessful
      },'no_thread');

      // create a path where neither option was matched
      // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
      convo.addMessage({
        text: 'Sorry I did not understand. Say `yes` or `no`',
        action: 'default',
      },'bad_response');

      // Create a yes/no question in the default thread...
      convo.say('Heyy');
      convo.ask('Have we met before?', [
        {
          pattern:  bot.utterances.yes,
          callback: function(response, convo) {
            convo.gotoThread('yes_thread');
          },
        },
        {
          pattern:  bot.utterances.no,
          callback: function(response, convo) {
            convo.gotoThread('no_thread');
          },
        },
        {
          default: true,
          callback: function(response, convo) {
            convo.gotoThread('bad_response');
          },
        }
      ]);

      convo.activate();

      // capture the results of the conversation and see what happened...
      convo.on('end', function(convo) {

        convo.say(convo.status);
        if (convo.successful()) {
          // this still works to send individual replies...
          bot.reply(message, 'Let us eat some!');

          // and now deliver cheese via tcp/ip...
        }

      });
    });

  });


};
