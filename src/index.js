const Aspect = require('./aspect.js');
const Format = require('./format.js');
const {
  getList, getAll, getOne, getMatchingAspect
} = require('./getters.js');
const { search, searchOne } = require('./search.js');

// console.log(
//   getMatchingAspect(
//     getOne({
//       width: 4096,
//       height: 2160
//     })
//   )
// );

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
