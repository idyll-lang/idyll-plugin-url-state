# idyll-plugin-url-state

This plugin enables the state of an Idyll article to be serialized/deserialized from the URL's query string.


## Usage

Install this as a dependency:

```
$ npm i --save idyll-plugin-url-state
```

This plugin requires being hooked into Idyll's context API. To do this, first you need to tell Idyll to use a custom context.

*In package.json*

```json
"idyll": {
  "context": "./context.js"
}
```

If you aren't using any other context plugins, your `context.js` file would look like this:

```js
const URLState = require('idyll-plugin-url-state');

// All keys
module.exports = URLState();

// Only certain keys
module.exports = URLState(['key1', 'key2', ...]);
```

If you are, you can use `idyll-context-compose` to compose multiple contexts together:



```js
const compose = require('idyll-context-compose');
const URLState = require('idyll-plugin-url-state');

module.exports = compose(URLState(), otherContext);
```


