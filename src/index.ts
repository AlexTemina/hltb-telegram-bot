import TelegramBot, { InlineQueryResultArticle } from 'node-telegram-bot-api';
import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';

const TOKEN = '1992836533:AAHkQNlcRHFLwkiBkmCgGIetK2C0SraJU7k';

const getText = (gameData: HowLongToBeatEntry) =>
  `${gameData.name.toUpperCase()}: 

  Main: ${gameData.gameplayMain} h. 
  Main + Extras: ${gameData.gameplayMainExtra} h. 
  Completionist: ${gameData.gameplayCompletionist} h. 
  
  https://howlongtobeat.com/game?id=${gameData.id}`;

const gameDataToArticle = (
  gameData: HowLongToBeatEntry,
): InlineQueryResultArticle => ({
  type: 'article',
  id: gameData.id,
  title: gameData.name,
  input_message_content: { message_text: getText(gameData) },
});

const bot = new TelegramBot(TOKEN, { polling: true });
const hltbService = new HowLongToBeatService();

bot.on('inline_query', (inlineQuery) => {
  if (inlineQuery.query.length > 0) {
    hltbService.search(inlineQuery.query).then((res) => {
      const results = res.map((gameData) => gameDataToArticle(gameData));

      bot.answerInlineQuery(inlineQuery.id, results);
    });
  }
});