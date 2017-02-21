'use strict';

const {inspect} = require('util');

const main = require('.');
const test = require('tape');
const cloneDeep = require('lodash/cloneDeep');

test('getProcessorIdsFromStylelintOptions()', t => {
  const option = {
    configOverrides: {
      processors: '@mapbox/stylelint-processor-markdown'
    }
  };
  const clonedOption = cloneDeep(option);

  const result = main(option);

  t.ok(result instanceof Set, 'should return a Set instance.');
  t.deepEqual(
    [...result],
    ['@mapbox/stylelint-processor-markdown'],
    'should get stylelint processor identifiers.'
  );

  t.deepEqual(option, clonedOption, 'should not mutate arguments.');

  t.strictEqual(
    inspect(main({
      config: {
        processors: [
          ['stylelint-processor-arbitrary-tags', {startTag: '***'}],
          './custom-processor.js'
        ]
      },
      configOverrides: {
        processors: 'stylelint-processor-html'
      }
    }), {breakLength: Infinity}),
    'Set { \'stylelint-processor-arbitrary-tags\', \'./custom-processor.js\' }',
    'should ignore `configOverrides` if `config` is provided.'
  );

  t.strictEqual(
    main({
      config: {
        processors: []
      }
    }).size,
    0,
    'should return an empty set if the config has an empty `processor` option.'
  );

  t.strictEqual(
    main({
      config: {}
    }).size,
    0,
    'should return an empty set if the config doesn\'t have `processor` option.'
  );

  t.strictEqual(
    main({}).size,
    0,
    'should return an empty set if the object has neither `config` nor `configOverrides`.'
  );

  t.strictEqual(
    main().size,
    0,
    'should return an empty set if it takes no arguments.'
  );

  t.throws(
    () => main({}, {}),
    /^TypeError.*Expected 0 or 1 argument \(\[object]\), but got 2 arguments instead\./,
    'should throw an error when it takes too many arguments.'
  );

  t.throws(
    () => main(['Hi']),
    /^TypeError.*Expected the argument to be an object of stylelint API options, but got \[ 'Hi' ]\./,
    'should throw an error when it takes a non-plain object.'
  );

  t.throws(
    () => main({
      config: Buffer.from('?'),
      configOverrides: {}
    }),
    /^TypeError.*Expected `config` option in stylelint API to be an object, but it was <Buffer 3f>\./,
    'should throw an error when the config object is not a plain object.'
  );

  t.throws(
    () => main({
      config: {
        processors: new Map()
      }
    }),
    /^TypeError.*`processors` property in the sytylelint config must be an array or a string, but it was Map \{\}\./,
    'should throw an error when `processor` option is neither an array nor a string.'
  );

  t.end();
});
