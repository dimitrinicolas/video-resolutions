/** Class representing an aspect-ratio */
class Aspect {
  /**
   * Create an Aspect
   * @param {string} [aspect='1:1']
   */
  constructor(aspect = '1:1') {
    this.string = aspect;
    const split = this.string.split(':').map(i => parseFloat(i, 10));
    this.float = split[0] / (typeof split[1] === 'number' ? split[1] : 1);
  }
}

module.exports = Aspect;
