const gcd = require('gcd');

const formats = require('./formats.json');

const Aspect = require('./aspect.js');

const {
  ASPECTS_LIST,
  DEFAULT_ASPECT,
  DEFAULT_PIXEL_ASPECT_RATIO
} = require('./constants.js');

/** Class representing an image format */
class Format {
  /**
   * Create a Format
   * @param {object} [data={}]
   */
  constructor(data = {}) {
    this.code = typeof data.code === 'string' ? data.code : null;
    this.name = typeof data.name === 'string' ? data.name : null;
    this.fullName = typeof data.fullName === 'string' ? data.fullName : null;
    this.alternativeNames = Array.isArray(data.alternativeNames)
      ? data.alternativeNames
      : [];

    this.width = typeof data.width === 'number' ? data.width : null;
    this.height = typeof data.height === 'number' ? data.height : null;

    this.aspects = {};

    if (typeof data.aspects !== 'object') {
      data.aspects = {};
      data.aspects.pixel = DEFAULT_PIXEL_ASPECT_RATIO;
      if (this.width !== null && this.height !== null) {
        const computedGcd = gcd(this.width, this.height);
        const computedAspect = `${this.width / computedGcd}:${this.height
          / computedGcd}`;
        data.aspects.storage = computedAspect;
        data.aspects.display = computedAspect;
      } else if (typeof data.aspect === 'string') {
        data.aspects[DEFAULT_ASPECT] = data.aspect;
        data.aspects.display = data.aspect;
      }
    }

    for (const aspect of ASPECTS_LIST) {
      this.aspects[aspect] = data.aspects && typeof data.aspects[aspect] === 'string'
        ? new Aspect(data.aspects[aspect])
        : null;
    }
  }

  get resolution() {
    return this.width !== null && this.height !== null
      ? `${this.width}x${this.height}`
      : null;
  }

  get pixelCount() {
    return this.width !== null && this.height !== null
      ? this.width * this.height
      : null;
  }

  get aspect() {
    return this.aspects[DEFAULT_ASPECT];
  }

  setHeight(height) {
    const newHeight = Math.round(height);
    if (this.width !== null && this.height !== null) {
      this.width = Math.round((this.width / this.height) * newHeight);
    }
    if (this.height !== newHeight) {
      this.code = null;
      this.name = null;
      this.fullName = null;
      this.alternativeNames = [];
      for (const format of formats) {
        if (
          this.width === format.width
          && newHeight === format.height
          && (this.aspects.storage === null
            || this.aspects.storage.string === format.aspects.storage)
          && (this.aspects.display === null
            || this.aspects.display.string === format.aspects.display)
          && (this.aspects.pixel === null
            || this.aspects.pixel.string === format.aspects.pixel)
        ) {
          this.code = format.code;
          this.name = format.name;
          this.fullName = format.fullName;
          this.alternativeNames = format.alternativeNames;
        }
      }
    }
    this.height = newHeight;
  }

  setWidth(width) {
    const newWidth = Math.round(width);
    if (this.width !== null && this.height !== null) {
      this.height = Math.round((this.height / this.width) * newWidth);
    }
    if (this.width !== newWidth) {
      this.code = null;
      this.name = null;
      this.fullName = null;
      this.alternativeNames = [];
      for (const format of formats) {
        if (
          newWidth === format.width
          && this.height === format.height
          && (this.aspects.storage === null
            || this.aspects.storage.string === format.aspects.storage)
          && (this.aspects.display === null
            || this.aspects.display.string === format.aspects.display)
          && (this.aspects.pixel === null
            || this.aspects.pixel.string === format.aspects.pixel)
        ) {
          this.code = format.code;
          this.name = format.name;
          this.fullName = format.fullName;
          this.alternativeNames = format.alternativeNames;
        }
      }
    }
    this.width = newWidth;
  }

  duplicate() {
    const copy = {
      code: this.code,
      name: this.name,
      fullName: this.fullName,
      alternativeNames: this.alternativeNames,
      width: this.width,
      height: this.height,
      aspects: {}
    };
    for (const aspect of ASPECTS_LIST) {
      copy.aspects[aspect] = this.aspects[aspect].string;
    }
    return new Format(copy);
  }

  isSameAs(format) {
    return (
      this.code === format.code
      && this.name === format.name
      && this.fullName === format.fullName
      && this.alternativeNames.join(', ') === format.alternativeNames.join(', ')
      && this.width === format.width
      && this.height === format.height
      && this.aspects.storage.string === format.aspects.storage.string
      && this.aspects.display.string === format.aspects.display.string
      && this.aspects.pixel.string === format.aspects.pixel.string
    );
  }
}

module.exports = Format;
