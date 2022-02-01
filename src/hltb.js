const { HLTB_URL_BASE } = require('./consts');

const getHLTBUrl = (id) => `${HLTB_URL_BASE}game?id=${id}`;
const getHLTBImageUrl = (imageUrl) => `${HLTB_URL_BASE}${imageUrl}`;

module.exports = {
  getHLTBUrl,
  getHLTBImageUrl,
};
