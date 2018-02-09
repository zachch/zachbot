/*

Start of the Zachbot conversation

*/

module.exports = function(controller) {

  controller.api.messenger_profile.greeting('Zachbot at your service');
  controller.on('facebook_postback', function(bot, message) {

    bot.createConversation(message, function(err, convo) {

      var met_before_attempt = 1;
      var met_before_yes_response = 'met_before_yes_default';

      var hannah_attempt = 1;
      var hannah_yes_response = 'hannah_yes_default';

      function get_met_before_yes_response(attempt) {
        switch(attempt){
          case 1:
            return 'First';
          case 2:
            return 'Second';
          case 3:
            return 'Third';
          case 4:
            return 'Fourth';
          case 5:
            return 'Fifth';
          case 6:
            return 'Sixth';
          case 7:
            return 'Seventh';
          case 8:
            return 'Eighth';
          default:
            return 'Eh how many times already...'
        }

      }

      // Q1. Have we met before question
      convo.addMessage({
        text: met_before_yes_response,
        action: 'default',
      },'met_before_yes_thread');

      convo.addMessage({
        text: 'Ehhhh stick to the script la. Try again!',
        action: 'default',
      },'met_before_bad_response');

      convo.addQuestion('Heyy... Have we met before?', [
        {
          pattern:  bot.utterances.yes,
          callback: function(response, convo) {
            met_before_attempt++;
            met_before_yes_response = get_met_before_yes_response(met_before_attempt);
            convo.gotoThread('met_before_yes_thread');
          },
        },
        {
          default: true,
          callback: function(response, convo) {
            met_before_attempt++;
            convo.gotoThread('met_before_bad_response');
          },
        },
        {
          pattern:  bot.utterances.no,
          callback: function(response, convo) {
            convo.gotoThread('hannah_thread');
          },
        }
      ], {}, 'default');

      // Q2. Hannah's friend question
      convo.addMessage({
        text: 'Oh...',
      },'hannah_thread');

      convo.addMessage({
        text: 'YESSSS. Ka Ching!',
        action: 'completed',
      },'hannah_yes_thread');

      convo.addMessage({
        text: 'Wrong answer la',
        action: 'hannah_thread',
      },'hannah_bad_response');

      convo.addQuestion('You are Hannah\'s friend?', [
        {
          pattern:  bot.utterances.yes,
          callback: function(response, convo) {
            convo.gotoThread('hannah_yes_thread');
         },
        },
        {
          default: true,
          callback: function(response, convo) {
            convo.gotoThread('hannah_bad_response');
          },
        }

      ], {},'hannah_thread');


      convo.activate();

      // capture the results of the conversation and see what happened...
      convo.on('end', function(convo) {

        convo.say(convo.status);
        convo.say('THE END');
        if (convo.successful()) {
          // this still works to send individual replies...
          bot.reply(message, 'Let us eat some!');

          // and now deliver cheese via tcp/ip...
        }

      });
    });

  });


};
