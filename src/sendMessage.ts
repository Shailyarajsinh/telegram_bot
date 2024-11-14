import { Telegraf, Markup } from 'telegraf';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);

const keyboard = Markup.inlineKeyboard([
  [Markup.button.url('Launch App', 'http://t.me/RatsKingdom_Bot/join'), Markup.button.url('Join Telegram', 'http://t.me/The_RatsKingdom')],
]);

const message = `🚨 FINAL & BIGGEST CHANCE: Earn 1,00,000 $RATS by Inviting 5 Friends! 🚨

As we’ve reached an incredible 6 Million user milestone, it’s time for the biggest opportunity yet for everyone! Many of you have been requesting another chance to earn more $RATS, especially those who missed our first "Invite 5 Friends" task. 

So here it is—the new and LAST refer task designed to reward you for helping expand our Rats Kingdom community!

🔥 Special Task: Invite 5 more friends to Rats Kingdom
🎁 Reward: 100,000 $RATS
⏰ Task Duration: 21 Days

🎯 Act fast—this is your LAST and BIGGEST opportunity to boost your $RATS balance before the SNAPSHOT! 🐀👑`;

const imagePath = './src/images/6million_invite_task.png';

// Replace this with a sample Telegram ID for testing
const sampleTelegramId = process.env.TELEGRAM_ID as string;

const sendMessage = async () => {
  try {
    await bot.telegram.sendMessage(sampleTelegramId, message, {
      reply_markup: keyboard.reply_markup,
    });
    if (fs.existsSync(imagePath)) {
      await bot.telegram.sendPhoto(sampleTelegramId, { source: imagePath });
    } else {
      console.log("Image path not found, sending text only.");
    }
    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Start the bot and run the function
bot.launch();
sendMessage();
