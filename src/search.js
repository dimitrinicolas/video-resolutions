const elasticlunr = require('elasticlunr');

const list = require('./list.js');

const {
  SEARCH_CODE_BOOST,
  SEARCH_NAME_BOOST,
  SEARCH_FULL_NAME_BOOST,
  SEARCH_ALETERNATIVE_NAMES_BOOST
} = require('./constants.js');

const index = elasticlunr();
index.setRef('id');
index.addField('code');
index.addField('name');
index.addField('fullName');
index.addField('alternativeNames');

for (let id = 0, len = list.length; id < len; id++) {
  const {
    code, name, fullName, alternativeNames
  } = list[id];
  index.addDoc({
    id,
    code,
    name,
    fullName,
    alternativeNames
  });
}

/**
 * Search for matching formats
 * @param {string} query
 */
const search = query => {
  if (typeof query === 'string') {
    const res = [];
    const searchRes = index.search(query, {
      fields: {
        code: { boost: SEARCH_CODE_BOOST },
        name: { boost: SEARCH_NAME_BOOST },
        fullName: { boost: SEARCH_FULL_NAME_BOOST },
        alternativeNames: { boost: SEARCH_ALETERNATIVE_NAMES_BOOST }
      },
      bool: 'OR',
      expand: true
    });
    for (const item of searchRes) {
      res.push({
        format: list[parseInt(item.ref, 10)].duplicate(),
        score: item.score
      });
    }
    return res;
  }
  return [];
};

/**
 * Search for matching formats
 * @param {string} query
 */
const searchOne = query => {
  const res = search(query);
  return res.length !== 0 ? res[0].format : null;
};

module.exports = {
  search,
  searchOne
};
