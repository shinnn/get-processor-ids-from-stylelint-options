/*!
 * get-processor-ids-from-stylelint-options | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/get-processor-ids-from-stylelint-options
*/
'use strict';

const {inspect} = require('util');

const isPlainObject = require('lodash/isPlainObject');

const props = new Set(['config', 'configOverrides']);

module.exports = function getProcessorIdsFromStylelintOptions(...args) {
  const argLen = args.length;

  if (argLen === 0) {
    return new Set();
  }

  if (argLen !== 1) {
    throw new TypeError(`Expected 0 or 1 argument ([object]), but got ${argLen} arguments instead.`);
  }

  const options = args[0];

  if (!isPlainObject(options)) {
    throw new TypeError(`Expected the argument to be an object of stylelint API options, but got ${
      inspect(options)
    }.`);
  }

  for (const prop of props) {
    const val = options[prop];

    if (val) {
      if (!isPlainObject(val)) {
        throw new TypeError(`Expected \`${prop}\` option in stylelint API to be an object, but it was ${
          inspect(val)
        }.`);
      }

      if (val.processors) {
        if (typeof val.processors === 'string') {
          return new Set([val.processors]);
        }

        if (Array.isArray(val.processors)) {
          const ids = new Set();

          for (const processor of val.processors) {
            ids.add(Array.isArray(processor) ? processor[0] : processor);
          }

          return ids;
        }

        throw new TypeError(
          `\`processors\` property in the sytylelint config must be an array or a string, but it was ${
            inspect(val.processors)
          }.`
        );
      }
    }
  }

  return new Set();
};
