/*

Start of the Zachbot conversation

*/

module.exports = function(controller) {

  controller.api.messenger_profile.greeting('Zachbot at your service');
  controller.on('facebook_postback', function(bot, message) {

    bot.startConversation(message, function(err, convo) {
      convo.say('Heyy');
      convo.ask('Have we met before?', [
        {
          pattern:  bot.utterances.yes,
          callback: function(response, convo) {
            convo.say(message, 'That\'s not what you said! Try again');
          },
        },
        {
          pattern:  bot.utterances.no,
          callback: function(response, convo) {
            convo.say(message, 'Umm you are Hannah\'s friend right?');
          },
        },
        {
          default: true,
          callback: function(response, convo) {
            convo.say(message, 'That\'s not what you said! Try again');
            convo.gotoThread('yes_thread');
          },
        }
      ]
      );
    });

  });


};
