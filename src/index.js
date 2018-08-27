const Aspect = require('./aspect.js');
const Format = require('./format.js');
const {
  getList, getAll, getOne, getMatchingAspect
} = require('./getters.js');
const { search, searchOne } = require('./search.js');

module.exports = {
  Aspect,
  Format,
  getList,
  getAll,
  getOne,
  getMatchingAspect,
  search,
  searchOne
};

const format = getOne({
  width: 4096,
  height: 2160
});

console.log(format);

format.setHeight(1080);

console.log(format);
