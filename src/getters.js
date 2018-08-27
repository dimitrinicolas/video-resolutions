const Format = require('./format.js');
const list = require('./list.js');

const { DEFAULT_ASPECT } = require('./constants.js');

/**
 * Get the full formats list
 */
const getList = () => {
  const res = [];
  for (const format of list) {
    res.push(format.duplicate());
  }
  return res;
};

/**
 * Get a list of matching formats
 * @param {object} query
 */
const getAll = (query = {}) => {
  const res = [];
  for (const format of list) {
    res.push(format.duplicate());
  }
  const result = res.filter(item => {
    for (const cat of Object.keys(query)) {
      if (cat === 'aspects') {
        for (const aspect of Object.keys(query[cat])) {
          if (
            (typeof query[cat][aspect] === 'string'
              && item[cat][aspect].string !== query[cat][aspect])
            || (typeof query[cat][aspect] === 'number'
              && item[cat][aspect].float !== query[cat][aspect])
          ) {
            return false;
          }
        }
        return true;
      }
      if (cat === 'aspect') {
        if (
          (typeof query[cat] === 'string'
            && item.aspects[DEFAULT_ASPECT].string !== query[cat])
          || (typeof query[cat] === 'number'
            && item.aspects[DEFAULT_ASPECT].float !== query[cat])
        ) {
          return false;
        }
        return true;
      }
      if (item[cat] !== query[cat]) {
        return false;
      }
    }
    return true;
  });
  return result;
};

/**
 * Get one format
 * @param {object} query
 * @param {object} opts
 */
const getOne = (query = {}, opts = {}) => {
  const result = getAll(query);
  if (result.length) {
    return result[0];
  }
  if (typeof opts.create === 'undefined' || opts.create) {
    return new Format(query);
  }
  return null;
};

/**
 * Get other formats matching a format aspect ratio
 * @param {Format} format
 * @param {string} [aspect='storage']
 */
const getMatchingAspect = (format, aspect = DEFAULT_ASPECT) => {
  const query = {
    aspects: {}
  };
  query.aspects[aspect] = format.aspects[aspect].string;
  const result = getAll(query);
  return result.filter(item => !format.isSameAs(item));
};

module.exports = {
  getList,
  getAll,
  getOne,
  getMatchingAspect
};
