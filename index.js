const queryString = require('query-string');

const updateURL = (qs) => {
  var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + qs;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

module.exports = (ctx) => {
  ctx.onMount(() => {
    if (window.location.search) {
      // Merge initial state with the state from URL if it exists:
      const parsed = queryString.parse(location.search);
      ctx.update(parsed)
    } else {
      // Otherwise serialize the initial state to the URL
      const data = ctx.data();
      const stringified = queryString.stringify(data);
      updateURL(stringified);
    }
  })

  // Update the url when data changes
  ctx.onUpdate((newData) => {
    const stringified = queryString.stringify(
        Object.assign({}, queryString.parse(location.search), newData));

    updateURL(stringified);
  })
}
