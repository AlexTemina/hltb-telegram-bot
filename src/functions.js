const { escapeMarkdown } = require('./markdown-escape');
const { getHLTBImageUrl, getHLTBUrl } = require('./hltb');

const getText = (gameData) => {
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

const gameDataToArticle = (gameData) => ({
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

module.exports = {
  getText,
  gameDataToArticle,
};
