// eslint-disable-next-line no-var
var list = document.querySelectorAll('#table tr');
// eslint-disable-next-line no-var
var res = [];
function codeify(str) {
  return str
    .toUpperCase()
    .replace(/\(/g, ' ')
    .replace(/\)/g, ' ')
    .trim()
    .replace(/\+/g, '_P')
    .replace(/ /g, '_')
    .replace(/-/g, '_')
    .replace(/_+/g, '_');
}
for (const item of list) {
  const tds = item.querySelectorAll('td');
  const fullName = tds[0].innerText === '—' ? null : tds[0].innerText;
  const smallName = fullName === null ? null : fullName.replace(/\(([^)]+)\)/gi, ' ').trim();
  let code;
  if (fullName && fullName.indexOf('(') !== -1) {
    code = codeify(/\(([^)]+)\)/.exec(fullName)[1]);
  } else {
    code = fullName ? codeify(fullName) : null;
  }
  const alternativeNames = [];
  if (tds[1].innerText.indexOf('Supported') === -1 && tds[1].innerText !== '') {
    let split;
    if (tds[1].innerText.indexOf('1080 HDTV (1080i') === 0) {
      split = [tds[1].innerText];
    } else {
      split = tds[1].innerText.split(',');
    }
    for (const i of split) {
      alternativeNames.push(
        i.replace(/\[\d+\](\[unreliable source\?\])?/gi, '').trim()
      );
    }
  }
  res.push({
    code,
    name: smallName,
    fullName,
    alternativeNames,
    width: parseInt(tds[2].innerText, 10),
    height: parseInt(tds[4].innerText, 10),
    type: 'computer',
    aspects: {
      storage: tds[5].innerText,
      display: tds[6].innerText,
      pixel: tds[7].innerText
    }
  });
}
console.log(JSON.stringify(res, 0, 2));
