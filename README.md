# video-resolutions [![Build Status][travis badge]][travis link] [![Coverage Status][coveralls badge]][coveralls link]

The data come from this Wikipedia page: 
[en.wikipedia.org/wiki/List_of_common_resolutions][wikipedia]

## Example

```js
import resolutions from 'video-resolutions';

/* some script playing with a video object */

const compatibleAspects = resolutions.getMatchingAspect(
  resolutions.getOne({
    width: video.width,
    height: video.height
  })
);
/* for 4096×2160, it returns: */
[
  Format {
    code: 'DCI_2K',
    name: 'DCI 2K',
    fullName: 'DCI 2K (DCI 2K)',
    alternativeNames: [],
    width: 2048,
    height: 1080,
    pixelCount: 2211840,
    aspects: {
      storage: Aspect { string: '256:135', float: 1.8962962962962964 },
      display: Aspect { string: '1.90:1', float: 1.9 },
      pixel: Aspect { string: '1.002', float: 1.002 }
    }
  }
]
```

## Installation

```console
$ npm install -D video-resolutions
```

## Usage

This package export this list of classes and functions:

- `Aspect` - A class representing an aspect-ratio
- `Format` - A class representing an image format
- `getList` - Get the list of the 185 formats
- `getAll` - Get a list of formats matching a query object (eg. a width)
- `getOne` - Returns the best result of `getAll` or create it
- `getMatchingAspect` - Get a list of formats matching another format aspect 
ratio
- `search` - Search a list of formats matching a query string
- `searchOne` - Returns the best result of `search` or `null`

### `Format`

Each format `code` is either an unique string or `null`.

The `Format` class has a getter `resolution` returning a string of the width 
and height merged around a "×" symbol.

`aspect` is always a shorthand for `aspects.storage`, either as a getter of 
the `Format` class or in a query object.

### `getList()`

```js
import resolutions from 'video-resolutions';

resolutions.getList();
/* returns: */
[
  {
    format: Format {
      code: null,
      name: null,
      fullName: null,
      alternativeNames: [ 'Microvision' ],
      width: 16,
      height: 16,
      pixelCount: 256,
      aspects: {
        storage: Aspect { string: '1:1', float: 1 },
        display: Aspect { string: '1:1', float: 1 },
        pixel: Aspect { string: '1:1', float: 1 }
      }
    },
    score: 20.509185851025467
  },
  /* 184 other items */
]
```

### `getAll(query)`

```js
resolutions.getAll({
  height: 1080
});
/* returns: */
[
  Format {
    code: null,
    name: null,
    fullName: null,
    alternativeNames: [ 'HDV 1080i' ],
    width: 1440,
    height: 1080,
    /* etc */
  }
  /* etc */
]
```

### `getOne(query, opts)`

```js
resolutions.getOne({
  width: 4096,
  height: 2160
});
/* returns: */
Format {
  code: 'DCI_4K',
  name: 'DCI 4K',
  fullName: 'DCI 4K (DCI 4K)',
  alternativeNames: [],
  width: 4096,
  height: 2160,
  pixelCount: 8847360,
  aspects: {
    storage: Aspect { string: '256:135', float: 1.8962962962962964 },
    display: Aspect { string: '1.90:1', float: 1.9 },
    pixel: Aspect { string: '1.002', float: 1.002 }
  }
}
```

If no format matches the query, `getOne` will by default return a new `Format` 
created from query's data. By settings the `opts` to `{ create: false }`, the 
function will instead return a null Object.

### `getMatchingAspect(format, aspect = 'storage')`

```js
resolutions.getMatchingAspect(
  resolutions.getOne({
    width: 4096,
    height: 2160
  })
);
/* returns: */
[
  Format {
    code: 'DCI_2K',
    name: 'DCI 2K',
    fullName: 'DCI 2K (DCI 2K)',
    alternativeNames: [],
    width: 2048,
    height: 1080,
    pixelCount: 2211840,
    aspects: {
      storage: Aspect { string: '256:135', float: 1.8962962962962964 },
      display: Aspect { string: '1.90:1', float: 1.9 },
      pixel: Aspect { string: '1.002', float: 1.002 }
    }
  }
]
```

If no format matches the query, `getOne` will by default return a new `Format` 
created from query's data. By settings the `opts` to `{ create: false }`, the 
function will instead return a null Object.

### `search(query)`

```js
resolutions.search('4k');
/* returns: */
[
  {
    format: Format {
      code: 'DCI_4K',
      name: 'DCI 4K',
      fullName: 'DCI 4K (DCI 4K)',
      alternativeNames: [],
      width: 4096,
      height: 2160,
      pixelCount: 8847360,
      aspects: {
        storage: Aspect { string: '256:135', float: 1.8962962962962964 },
        display: Aspect { string: '1.90:1', float: 1.9 },
        pixel: Aspect { string: '1.002', float: 1.002 }
      }
    },
    score: 20.509185851025467
  },
  {
    format: Format {
      code: '4K_UHD_1',
      name: '4K Ultra HD 1',
      fullName: '4K Ultra HD 1 (4K UHD-1)',
      alternativeNames: [ '2160p', '4000-lines UHDTV (4K UHD)' ],
      width: 3840,
      height: 2160,
      pixelCount: 8294400,
      aspects: {
        storage: Aspect { string: '16:9', float: 1.7777777777777777 },
        display: Aspect { string: '16:9', float: 1.7777777777777777 },
        pixel: Aspect { string: '1:1', float: 1 }
      }
    },
    score: 17.092425489432678
  },
  {
    format: Format {
      code: 'UW4K',
      name: 'Ultra-Wide 4K',
      fullName: 'Ultra-Wide 4K (UW4K)',
      alternativeNames: [],
      width: 3840,
      height: 1600,
      pixelCount: 6144000,
      aspects: {
        storage: Aspect { string: '2.35:1', float: 2.35 },
        display: Aspect { string: '2.35:1', float: 2.35 },
        pixel: Aspect { string: '0.996', float: 0.996 }
      }
    },
    score: 15.99784821394083
  }
]
```

### `searchOne(query)`

This function will return the best result from `searchAll` or `null`.

## Related

[elasticlunr][elasticlunr] - Package powering the format search engine

## License

This project is licensed under the [MIT license](LICENSE).

[travis badge]: https://travis-ci.org/dimitrinicolas/video-resolutions.svg?branch=master
[travis link]: https://travis-ci.org/dimitrinicolas/video-resolutions
[coveralls badge]: https://coveralls.io/repos/github/dimitrinicolas/video-resolutions/badge.svg?branch=master
[coveralls link]: https://coveralls.io/github/dimitrinicolas/video-resolutions?branch=master

[wikipedia]: https://en.wikipedia.org/wiki/List_of_common_resolutions
[elasticlunr]: https://www.npmjs.com/package/elasticlunr
