import TelegramBot, { InlineQueryResultArticle } from 'node-telegram-bot-api';
import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';
import dotenv from 'dotenv';

const HLTB_URL_BASE = 'https://howlongtobeat.com/';

dotenv.config();

const { BOT_TOKEN } = process.env;

const getHLTBUrl = (id: string) => `${HLTB_URL_BASE}game?id=${id}`;
const getHLTBImageUrl = (imageUrl: string) => `${HLTB_URL_BASE}${imageUrl}`;

const getText = (gameData: HowLongToBeatEntry) =>
  `*${gameData.name.toUpperCase()}*

*Main*: _${gameData.gameplayMain} h_
*Main + Extras*: _${gameData.gameplayMainExtra} h_
*Completionist*: _${gameData.gameplayCompletionist} h_

${getHLTBUrl(gameData.id)}`;

const gameDataToArticle = (
  gameData: HowLongToBeatEntry,
): InlineQueryResultArticle => ({
  type: 'article',
  id: gameData.id,
  title: gameData.name,
  input_message_content: {
    message_text: getText(gameData),
    disable_web_page_preview: true,
    parse_mode: 'markdown',
  },
  thumb_url: getHLTBImageUrl(gameData.imageUrl),
  url: getHLTBUrl(gameData.id),
  hide_url: true,
});

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const hltbService = new HowLongToBeatService();

bot.on('inline_query', (inlineQuery) => {
  if (inlineQuery.query.length > 0) {
    hltbService.search(inlineQuery.query).then((res) => {
      const results = res.map((gameData) => gameDataToArticle(gameData));

      bot.answerInlineQuery(inlineQuery.id, results);
    });
  }
});
