// '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
const replacements = [
  [/_/g, '\\_'],
  [/\*/g, '\\*'],
  [/\(/g, '\\('],
  [/\)/g, '\\)'],
  [/\[/g, '\\['],
  [/\]/g, '\\]'],
  [/~/g, '\\~'],
  [/`/g, '\\`'],
  [/>/g, '&gt;'],
  [/#/g, '\\#'],
  [/\+/g, '\\+'],
  [/-/g, '\\-'],
  [/=/g, '\\='],
  [/\|/g, '\\|'],
  [/\{/g, '\\{'],
  [/\}/g, '\\}'],
  [/\./g, '\\.'],
  [/!/g, '\\!'],
];

const escapeMarkdown = (string) => {
  return replacements.reduce(function (string, replacement) {
    return string.replace(replacement[0], replacement[1]);
  }, string);
};

module.exports = {
  escapeMarkdown,
};
