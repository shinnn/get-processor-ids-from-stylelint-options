# get-processor-ids-from-stylelint-options

[![NPM version](https://img.shields.io/npm/v/get-processor-ids-from-stylelint-options.svg)](https://www.npmjs.com/package/get-processor-ids-from-stylelint-options)
[![Build Status](https://travis-ci.org/shinnn/get-processor-ids-from-stylelint-options.svg?branch=master)](https://travis-ci.org/shinnn/get-processor-ids-from-stylelint-options)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/get-processor-ids-from-stylelint-options.svg)](https://coveralls.io/github/shinnn/get-processor-ids-from-stylelint-options?branch=master)

Get [stylelint](https://stylelint.io/) [processor](https://stylelint.io/user-guide/processors/) identifiers from a [stylelint option object](https://stylelint.io/user-guide/node-api/#options)

```javascript
const getProcessorIdsFromStylelintOptions = require('get-processor-ids-from-stylelint-options');

getProcessorIdsFromStylelintOptions({
  config: {
    processors: [
      '@mapbox/stylelint-processor-markdown',
      ['./custom-proessor.js', {
        optionOne: true,
        optionTwo: false
      }]
    ]
  }
}); //=> Set {'@mapbox/stylelint-processor-markdown', './custom-processor.js'}
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install get-processor-ids-from-stylelint-options
```

## API

```javascript
const getProcessorIdsFromStylelintOptions = require('get-processor-ids-from-stylelint-options');
```

### getProcessorIdsFromStylelintOptions([*options*])

*options*: `Object` ([stylelint API options](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/node-api.md#options))  
Return: `Set<string>`

```javascript
getProcessorIdsFromStylelintOptions({
  config: {
    processors: [
      './processor0.js',
      './processor1.js'
    ]
  }
}); //=> Set {'./processor0.js', ./processor1.js'}

getProcessorIdsFromStylelintOptions({
  configOverrides: {
    processors: '/processor/can/be/a/string/instead/of/an/array.js'
  }
}); //=> Set {'/processor/can/be/a/string/instead/of/an/array.js'}

getProcessorIdsFromStylelintOptions({
  config: {},
  configOverrides: {
    processors: 'configOverrides/will/be/ignored/when/both/config/and/configOverrides/are/provided'
  }
}); //=> Set {}

getProcessorIdsFromStylelintOptions(); //=> Set {}
```

## License

Copyright (c) 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
