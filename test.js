import test from 'ava';

import resolutions from '.';

const FORMAT_COUNTS = 184;

/* List */

test('getList', async t => {
  const list = resolutions.getList();
  t.is(list.length, FORMAT_COUNTS);
});

test('unique code', async t => {
  const codeList = [];
  const list = resolutions.getList();
  for (const item of list) {
    if (item.code !== null) {
      if (codeList.indexOf(item.code) === -1) {
        codeList.push(item.code);
      } else {
        t.fail(item.code);
        return;
      }
    }
  }
  t.pass();
});

test('unique resolutions', async t => {
  const resolutionsList = [];
  const list = resolutions.getList();
  for (const item of list) {
    if (item.resolution !== null) {
      if (resolutionsList.indexOf(item.resolution) === -1) {
        resolutionsList.push(item.resolution);
      } else {
        t.fail(JSON.stringify(item, 0, 2));
        return;
      }
    }
  }
  t.pass();
});

test('properly sorted', async t => {
  const list = resolutions.getList();
  for (let i = 1, len = list.length; i < len; i++) {
    if (
      list[i].height < list[i - 1].height
      || (list[i].height === list[i - 1].height
        && list[i].width < list[i - 1].width)
    ) {
      t.fail(JSON.stringify([i - 1, list[i - 1], list[i]], 0, 2));
    }
  }
  t.pass();
});

/* Aspect */

test('Aspect no param', async t => {
  const aspect = new resolutions.Aspect();
  t.is(aspect.string, '1:1');
});

/* Format */

test('Format no param', async t => {
  const format = new resolutions.Format();
  t.is(format.aspect, null);
});

test('Format { aspect: String }', async t => {
  const format = new resolutions.Format({
    aspect: '16:9'
  });
  t.is(format.aspect.string, '16:9');
});

test('Format.resolution', async t => {
  const format = new resolutions.Format({
    width: 1920,
    height: 1080
  });
  t.is(format.resolution, '1920x1080');
});

test('Format.resolution no dimension', async t => {
  const format = new resolutions.Format({
    aspect: '16:9'
  });
  t.is(format.resolution, null);
});

test('Format.pixelCount', async t => {
  const format = new resolutions.Format({
    width: 1920,
    height: 1080
  });
  t.is(format.pixelCount, 1920 * 1080);
});

test('Format.pixelCount no dimension', async t => {
  const format = new resolutions.Format({
    aspect: '16:9'
  });
  t.is(format.pixelCount, null);
});

test('Format.setWidth', async t => {
  const format = resolutions.getOne({
    width: 1920,
    height: 1080
  });
  format.setWidth(1920 * 2);

  t.is(format.code, '4K_UHD_1');
  t.is(format.width, 1920 * 2);
  t.is(format.height, 1080 * 2);
});

test('Format.setWidth same', async t => {
  const format = resolutions.searchOne('FHD');
  format.setWidth(format.width);

  t.not(format.code, null);
  t.is(format.width, 1920);
  t.is(format.height, 1080);
});

test('Format.setWidth no ratio', async t => {
  const format = new resolutions.Format({
    width: 1920
  });
  format.setWidth(1920 * 2);

  t.is(format.width, 1920 * 2);
  t.is(format.height, null);
});

test('Format.setHeight', async t => {
  const format = resolutions.getOne({
    width: 1920,
    height: 1080
  });
  format.setHeight(1080 * 2);

  t.is(format.code, '4K_UHD_1');
  t.is(format.width, 1920 * 2);
  t.is(format.height, 1080 * 2);
});

test('Format.setHeight same', async t => {
  const format = resolutions.searchOne('FHD');
  format.setHeight(format.height);

  t.not(format.code, null);
  t.is(format.width, 1920);
  t.is(format.height, 1080);
});

test('Format.setHeight no ratio', async t => {
  const format = new resolutions.Format({
    height: 1080
  });
  format.setHeight(1080 * 2);

  t.is(format.height, 1080 * 2);
  t.is(format.width, null);
});

/* getAll */

test('getAll', async t => {
  const res = resolutions.getAll({
    height: 1080
  });
  t.not(res.length, 0);
  for (const item of res) {
    if (item.height !== 1080) {
      t.fail(item.height);
      return;
    }
  }
  t.pass();
});

test('getAll no param', async t => {
  const res = resolutions.getAll();
  t.is(res.length, FORMAT_COUNTS);
});

/* getOne */

test('getOne', async t => {
  const res = resolutions.getOne({
    height: 1080
  });
  t.is(res.height, 1080);
});

test('getOne no param', async t => {
  const res = resolutions.getOne();
  t.not(res, null);
});

test('getOne { aspect: String }', async t => {
  const res = resolutions.getOne({
    aspect: '256:135'
  });
  t.is(res.aspects.storage.string, '256:135');
  t.is(res.aspect.string, '256:135');
});

test('getOne { aspect: Float }', async t => {
  const res = resolutions.getOne({
    aspect: 256 / 135
  });
  t.is(res.aspects.storage.string, '256:135');
  t.is(res.aspect.string, '256:135');
});

test('getOne { aspects: { display: String } }', async t => {
  const res = resolutions.getOne({
    aspects: {
      display: '16:9'
    }
  });
  t.is(res.aspects.display.string, '16:9');
});

test('getOne { aspects: { display: Float } }', async t => {
  const res = resolutions.getOne({
    aspects: {
      display: 16 / 9
    }
  });
  t.is(res.aspects.display.string, '16:9');
});

test('getOne create: true', async t => {
  const res = resolutions.getOne({
    width: 1920 * 500,
    height: 1080 * 500
  });
  t.is(res.width, 1920 * 500);
  t.is(res.height, 1080 * 500);
  t.is(res.aspect.string, '16:9');
  t.is(res.code, null);
  t.is(res.name, null);
  t.is(res.fullName, null);
});

test('getOne create: false', async t => {
  const res = resolutions.getOne(
    {
      width: 1920 * 500,
      height: 1080 * 500
    },
    { create: false }
  );
  t.is(res, null);
});

/* getMatchingAspect */

test('getMatchingAspect', async t => {
  const one = resolutions.getOne({
    width: 1920,
    height: 1080
  });
  t.is(one.aspect.string, '16:9');
  const res = resolutions.getMatchingAspect(one);
  for (const item of res) {
    if (item.aspect.string !== '16:9') {
      t.fail();
    }
  }
  t.pass();
});

/* search */

test('search', async t => {
  const res = resolutions.search('5k');
  t.not(res.length, 0);
  t.true(/5k/gi.test(res[0].format.code) || /5k/gi.test(res[0].format.name));
});

test('searchOne', async t => {
  const res = resolutions.searchOne('5k');
  t.not(res, null);
  t.true(/5k/gi.test(res.code) || /5k/gi.test(res.name));
});

test('search invalid param', async t => {
  const res = resolutions.search(null);
  t.is(res.length, 0);
});

test('searchOne invalid param', async t => {
  const res = resolutions.searchOne(null);
  t.is(res, null);
});
