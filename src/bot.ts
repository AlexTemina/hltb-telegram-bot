import { escapeMarkdown } from './markdown-escape';
import TelegramBot, { InlineQueryResultArticle } from 'node-telegram-bot-api';
import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';

const HLTB_URL_BASE = 'https://howlongtobeat.com/';

const { BOT_TOKEN } = process.env;

const getHLTBUrl = (id: string) => `${HLTB_URL_BASE}game?id=${id}`;
const getHLTBImageUrl = (imageUrl: string) => `${HLTB_URL_BASE}${imageUrl}`;

const getText = (gameData: HowLongToBeatEntry) => {
  const gameUrl = escapeMarkdown(getHLTBUrl(gameData.id));
  const imageUrl = escapeMarkdown(getHLTBImageUrl(gameData.imageUrl));
  const uppercaseName = escapeMarkdown(gameData.name.toUpperCase());

  const gameNameLink = `[${uppercaseName}](${imageUrl})`;

  return `
*${gameNameLink}*

*Main*: _${escapeMarkdown(gameData.gameplayMain.toString())} h_
*Main \\+ Extras*: _${escapeMarkdown(gameData.gameplayMainExtra.toString())} h_
*Completionist*: _${escapeMarkdown(
    gameData.gameplayCompletionist.toString(),
  )} h_

${gameUrl}
  `;
};

const gameDataToArticle = (
  gameData: HowLongToBeatEntry,
): InlineQueryResultArticle => ({
  type: 'article',
  id: gameData.id,
  title: gameData.name,
  input_message_content: {
    message_text: getText(gameData),
    parse_mode: 'markdownV2',
  },
  thumb_url: getHLTBImageUrl(gameData.imageUrl),
  url: getHLTBUrl(gameData.id),
  hide_url: true,
});

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const hltbService = new HowLongToBeatService();

bot.on('inline_query', (inlineQuery) => {
  if (inlineQuery.query.length > 0) {
    hltbService.search(inlineQuery.query).then((queryResult) => {
      const results = queryResult.map((gameData) =>
        gameDataToArticle(gameData),
      );

      bot.answerInlineQuery(inlineQuery.id, results);
    });
  }
});

export { bot };
