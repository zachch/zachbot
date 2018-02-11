/*

Start of the Zachbot conversation

Heyy, have we met before?
No.
Oh.. you are hannah's friend?
Yes.
Yeah I think we met at Zouk a long time ago.
Let's catch up one day for coffee, can I have your number?
Sure, here's my name card.

---

Okkayy, so that was when we reconnected. Here's a photo of you on the
first night we went for beer.

[IMAGE]

Want to see other memories? Just tell me 'More memories'. And when you are done
say 'I want to make new memories'.

Show random photos
1. Staycation
2. First ever 'present' - macs bag
3. First movie together - ticket stubs
4.

---

new_memories_thread

Sooo.... Zhi wanted to ask you something...
Are you ready?

--

Will
You
Be
Zhi's
Gf?
[Image]


*/

module.exports = function(controller) {

  controller.api.messenger_profile.greeting('Zachbot at your service');
  controller.hears(['start'], 'message_received', function(bot, message) {

    bot.createConversation(message, function(err, convo) {

      // Q1. Have we met before question
      convo.addMessage({
        text: 'Excuuuseee me. You definitely didn\'t say yes =/. Again!',
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
            convo.gotoThread('met_before_yes_thread');
          },
        },
        {
          default: true,
          callback: function(response, convo) {
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
        text: 'Ummm...',
      },'hannah_thread');

      convo.addQuestion('Are you Hannah\'s friend?', [
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

      convo.addMessage({
        text: 'Haaa..okay enough role playing... Hannahs name was the key, and you eventually agreed to coffee with my master.',
      },'hannah_yes_thread');

      convo.addMessage({
        text: 'And that was how it all started....',
      },'hannah_yes_thread');

      convo.addMessage({
        text: 'Zhi wanted me to tell you, that he cannot believe how happy you make him feel.',
      },'hannah_yes_thread');

      convo.addMessage({
        text: 'And he wanted me to ask you...',
      },'hannah_yes_thread');

      convo.addMessage({
        text: '...',
      },'hannah_yes_thread');

      convo.addMessage({
        action: 'completed',
        text: 'Okay okay, look up if he is in the room, or go look for him.. he wants to give you something.',
      },'hannah_yes_thread');

      convo.addMessage({
        text: 'Ahhh this bot isn\'t that smart... Answer yes or no!',
        action: 'hannah_thread',
      },'hannah_bad_response');


      convo.activate();

      // capture the results of the conversation and see what happened...
      convo.on('end', function(convo) {

        if (convo.successful()) {
          // this still works to send individual replies...
          // and now deliver cheese via tcp/ip...
        }

      });
    });

  });


};
