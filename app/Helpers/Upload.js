const Config = use('Config');

class UploadHelper {
  static getInstitutionUploadPath(institutionSlug) {
    return Config.get('files.paths.institutions').replace('{INSTITUTION_NAME}', institutionSlug);
  }

  static getCampaingsUploadPath(institutionSlug, campaignSlug) {
    return `${Config.get('files.paths.campaigns').replace('{INSTITUTION_NAME}', institutionSlug)}/${campaignSlug}`;
  }
}

module.exports = UploadHelper;
