import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined in the .env file");
}

const bot = new Telegraf(BOT_TOKEN);

console.log('Bot is up and running');

// Bot functionality remains the same
bot.start((ctx) => {
  ctx.reply(
    `Hello, ${ctx.from.first_name}! Welcome to our bot.`,
    Markup.keyboard([
      ['📬 Get Message', 'ℹ️ Info'],
    ])
      .resize()
  );
});

// Example command to send a message to the user
bot.command('sendMessage', async (ctx) => {
  const userId = ctx.from.id;
  const message = "Here's a message for you! 🚀";
  
  try {
    await ctx.telegram.sendMessage(userId, message);
    ctx.reply('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
    ctx.reply('Failed to send message.');
  }
});

bot.command('sendPhoto', async (ctx) => {
  const userId = ctx.from.id;
  const photoUrl = 'https://images.unsplash.com/photo-1726853546098-380e29da9e31?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  
  try {
    await ctx.telegram.sendPhoto(userId, photoUrl);
    ctx.reply('Photo sent successfully!');
  } catch (error) {
    console.error('Error sending photo:', error);
    ctx.reply('Failed to send photo.');
  }
});

bot.hears('I Info', (ctx) => {
  ctx.reply('This is a simple bot that sends messages to users.');
});

bot.hears('📬 Get Message', (ctx) => {
  ctx.reply("Here's your special message! 🎉");
});

// Launch the bot
bot.launch().then(() => {
  console.log('Bot is up and running');
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
