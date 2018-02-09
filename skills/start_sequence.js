/*

Start of the Zachbot conversation

*/

module.exports = function(controller) {

  controller.api.messenger_profile.greeting('Zachbot at your service');
  controller.on('facebook_postback', function(bot, message) {

    bot.createConversation(message, function(err, convo) {

      let met_before_yes_attempt = 1;
      let met_before_bad_attempt = 1;
      let hannah_attempt = 1;

      function get_met_before_yes_response(attempt) {
        switch(attempt){
          case 1:
            return 'You didn\'t say yes... try again';
          case 2:
            return 'Eh you definitely didn\'t say yes la. One more time...';
          case 3:
            return 'Haaa... ok ok. Just answer what you answered that day in the lift. Hint: You said NO';
          default:
            return 'Eh how many times already...'
        }
      }

      function get_met_before_bad_response(attempt){
        switch(attempt){
          case 1:
            return 'Ok relax ah, Zachbot isn\'t that smart. Just reply with yes or no. Try again...';
          case 2:
            return 'Ummm, yes or no answer. Second warning. Repeat...';
          case 3:
            return 'Dudeeeee.... I\'m a dumb bot (not enough time).. go easy on ne. Yes or no. Here we go again..';
          default:
            return 'Eh how many times already...'
        }
      }

      // Q1. Have we met before question
      convo.addMessage({
        text: '{{ vars.met_before_yes_response }}',
        action: 'default',
      },'met_before_yes_thread');

      convo.addMessage({
        text: '{{ var.met_before_bad_response }}',
        action: 'default',
      },'met_before_bad_response');

      convo.addQuestion('Heyy... Have we met before?', [
        {
          pattern:  bot.utterances.yes,
          callback: function(response, convo) {
            met_before_yes_attempt++;
            convo.setVar('met_before_yes_response', get_met_before_yes_response(met_before_yes_attempt));
            convo.gotoThread('met_before_yes_thread');
          },
        },
        {
          default: true,
          callback: function(response, convo) {
            met_before_bad_attempt++;
            convo.setVar('met_before_bad_response', get_met_before_bad_response(met_before_bad_attempt));
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
