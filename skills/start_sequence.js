/*

Start of the Zachbot conversation

*/

module.exports = function(controller) {

  controller.api.messenger_profile.greeting('Zachbot at your service');
  controller.on('facebook_postback', function(bot, message) {

    bot.createConversation(message, function(err, convo) {

      // create a path for when a user says YES
      convo.addMessage({
        text: 'Excuuuseee me. You definitely didn\'t say yes =/. Again!',
      },'yes_thread');

      // create a path for when a user says NO
      // mark the conversation as unsuccessful at the end
      convo.addMessage({
        text: '',
        action: 'stop', // this marks the conversation as unsuccessful
      },'no_thread');

      // create a path where neither option was matched
      // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
      convo.addMessage({
        text: 'Ehhhh stick to the script la. Try again!',
        action: 'default',
      },'bad_response');

      // Create a yes/no question in the default thread...
      convo.addQuestion('Heyy... Have we met before?', [
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
      ], {}, 'default');

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
