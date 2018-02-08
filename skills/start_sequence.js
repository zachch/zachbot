/*

Start of the Zachbot conversation

*/

module.exports = function(controller) {

  controller.api.messenger_profile.greeting('');
  controller.on('facebook_postback', function(bot, message) {

    bot.reply(message, 'Heyy');

  });


};
