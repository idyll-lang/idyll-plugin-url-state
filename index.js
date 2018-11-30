const queryString = require('query-string');

const updateURL = (qs) => {
  var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + qs;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

const stripKeys = (whitelist, obj) => {
  const ret = {};
  Object.keys(obj).forEach((key) => {
    if (whitelist) {
      if (whitelist[key]) {
        ret[key] = obj[key];
      }
    } else {
      ret[key] = obj[key];
    }
  })
  return ret;
}

module.exports = (whitelist) => {
  return (ctx) => {
    ctx.onMount(() => {
      if (window.location.search) {
        // Merge initial state with the state from URL if it exists:
        const parsed = queryString.parse(location.search);
        ctx.update(parsed)
      } else {
        // Otherwise serialize the initial state to the URL
        const data = ctx.data();

        if (whitelist) {

        }
        const stringified = queryString.stringify(stripKeys(whitelist, data));
        updateURL(stringified);
      }
    })

    // Update the url when data changes
    ctx.onUpdate((newData) => {
      const stringified = queryString.stringify(
          stripKeys(whitelist, Object.assign({}, queryString.parse(location.search), newData)));

      updateURL(stringified);
    })
  }
}