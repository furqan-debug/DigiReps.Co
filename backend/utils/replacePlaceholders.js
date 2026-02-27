function replacePlaceholders(html, data) {
  return html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');
}

module.exports = { replacePlaceholders };
