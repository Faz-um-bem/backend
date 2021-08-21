const slugify = require('slugify');

class SlugHelper {
  static createSlug({ text, options = {} }) {
    return slugify(text, {
      replacement: '-',
      lower: true,
      ...options,
    });
  }
}

module.exports = SlugHelper;
