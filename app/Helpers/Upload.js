const Config = use('Config');

class UploadHelper {
  static getInstitutionUploadPath() {
    return Config.get('files.paths.institutions');
  }

  static getCampaingsUploadPath() {
    return `${Config.get('files.paths.campaigns')}`;
  }
}

module.exports = UploadHelper;
