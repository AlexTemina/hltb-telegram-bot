/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
const replacements: [RegExp, string][] = [
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

export const escapeMarkdown = (string: string): string => {
  return replacements.reduce(function (string, replacement) {
    return string.replace(replacement[0], replacement[1]);
  }, string);
};
