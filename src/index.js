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
  width: 1920,
  height: 1080
});

format.setWidth(format.height * 2);

console.log(format);

console.log(
  getOne({
    width: 1920,
    height: 1080
  })
);
