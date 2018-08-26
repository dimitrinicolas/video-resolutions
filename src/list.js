const Format = require('./format.js');
const formats = require('./formats.json');

const list = [];

for (const item of formats) {
  list.push(new Format(item));
}

module.exports = list;
