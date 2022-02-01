'use strict';

const { HowLongToBeatService } = require('howlongtobeat');
const axios = require('axios');
const { gameDataToArticle } = require('./src/functions');

const hltbService = new HowLongToBeatService();

module.exports.hello = async (event) => {
  if (event && event.body) {
    const telegramBody = JSON.parse(event.body);
    if (telegramBody) {
      const inlineQuery = telegramBody.inline_query;

      if (inlineQuery && inlineQuery.query.length > 0) {
        try {
          const queryResult = await hltbService.search(inlineQuery.query);

          const results = queryResult.map((gameData) =>
            gameDataToArticle(gameData),
          );

          const res = await axios.post(
            'https://api.telegram.org/bot' +
              process.env.BOT_TOKEN +
              '/answerInlineQuery',
            {
              inline_query_id: inlineQuery.id,
              results: JSON.stringify(results),
            },
          );

          console.log(res.data);

          return {
            statusCode: 200,
            body: JSON.stringify({ result: res.data }),
          };
        } catch (err) {
          console.error(err);

          return {
            statusCode: 400,
            body: JSON.stringify({ error: err }),
          };
        }
      }
    }
  }

  console.log('No match');

  return {
    statusCode: 200,
    body: JSON.stringify({ match: false }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
