const Hash = use('Hash');
const UploadHelper = use('App/Helpers/Upload');
const SlugHelper = use('App/Helpers/Slug');
const GenericException = use('App/Exceptions/GenericException');
const Config = use('Config');
const { institutionStatus } = use('App/Models/Enums/Institution');
const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

class CreateInstitutionUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return [
      'App/Models/Institution',
      'App/Models/InstitutionEventsLog',
      'App/Models/Shared/UnitOfWork',
      'FileStorage',
    ];
  }

  // Recebe dependências declaradas no inject
  constructor(
    institutionModel,
    institutionEventsLogModel,
    uow,
    fileStorageProvider,
  ) {
    this.institutionModel = institutionModel;
    this.institutionEventsLogModel = institutionEventsLogModel;
    this.uow = uow;
    this.fileStorageProvider = fileStorageProvider;
  }

  async execute({ file, ...institutionData }) {
    const photoDateTime = Date.now();

    try {
      await this.uow.startTransaction();

      const logoUploadResult = await this.saveLogo(file, photoDateTime);
      if (!logoUploadResult.success)
        return logoUploadResult;

      const institutionSlug = SlugHelper.createSlug({ text: institutionData.name });

      const institution = await this.institutionModel.create(
        {
          ...institutionData,
          status: institutionStatus.underReview,
          password: await Hash.make(institutionData.password),
          logo: logoUploadResult.path,
          slug: institutionSlug,
        },
        this.uow.transaction,
      );

      await this.institutionEventsLogModel.create(
        {
          event_type: eventLogTypes.create,
          data: institution.toJSON(),
          institution_id: institution.id,
        },
        this.uow.transaction,
      );

      await this.uow.commitTransaction();

      return { success: true, data: institution };
    } catch (error) {
      await this.uow.rollbackTransaction();

      await this.deleteLogo(file, photoDateTime);

      throw error;
    }
  }

  async saveLogo(file, photoDateTime) {
    if (!file)
      return { success: true, path: null };

    const allowedTypes = Config.get('files.allowedTypes');
    if (!allowedTypes.has(file.type))
      return { success: false, message: 'Tipo de arquivo não suportado' };

    const maxSize = Config.get('files.maxSize');
    if (maxSize < file.size)
      return { success: false, message: `Tamanho maximo do arquivo deve ser ${maxSize}` };

    const logo = await this.fileStorageProvider
      .saveFile({ file: file.value, path: `${UploadHelper.getInstitutionUploadPath()}/${photoDateTime}-${file.name}` });

    if (!logo.success)
      throw new GenericException('Erro ao salvar foto');

    return logo;
  }

  deleteLogo(file, photoDateTime) {
    if (!file)
      return null;

    return this.fileStorageProvider
      .deleteFile({ path: `${UploadHelper.getInstitutionUploadPath()}/${photoDateTime}-${file.name}` });
  }
}

module.exports = CreateInstitutionUseCase;
