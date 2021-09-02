module.exports = {
  paths: {
    institutions: 'institutions/{INSTITUTION_NAME}',
    campaigns: `${this.institutions}/campaigns`,
  },
  maxSize: 26214400, // 25 Mb em bytes
  allowedTypes: new Set(['image/png', 'image/jpeg', 'image/svg+xml']),
  maxPhotoAmount: 10,
};
