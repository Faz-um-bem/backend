const { eventLogTypes, eventLogStatus } = use('App/Models/Enums/EventsLogs');

const { institutionStatus } = use('App/Models/Enums/Institution');

const Config = use('Config');
const UploadHelper = use('App/Helpers/Upload');

const BusinessException = use('App/Exceptions/BusinessException');
const NotFoundException = use('App/Exceptions/NotFoundException');
const GenericException = use('App/Exceptions/GenericException');

class RequestInstitutionUpdateUseCase {
  static get inject() {
    return [
      'App/Models/Institution',
      'App/Models/InstitutionEventsLog',
      'App/Models/Shared/UnitOfWork',
      'FileStorage',
    ];
  }

  constructor(institutionModel, institutionEventsLogModel, uow, fileStorageProvider) {
    this.institutionModel = institutionModel;
    this.institutionEventsLogModel = institutionEventsLogModel;
    this.uow = uow;
    this.fileStorageProvider = fileStorageProvider;
  }

  async execute({
    file, ...institutionData
  }) {
    const photoDateTime = Date.now();

    try {
      await this.uow.startTransaction();

      const institutionEventLog = await this.institutionEventsLogModel
        .query()
        .where({
          status: eventLogStatus.underReview,
          institution_id: institutionData.id,
        })
        .first();
      if (institutionEventLog)
        return { success: false, data: new BusinessException('Instituição já possui atualização em análise') };

      const institution = await this.institutionModel.find(institutionData.id);
      if (!institution)
        return { success: false, data: new NotFoundException('Instituição não encontrada') };

      const uniqueFieldsValidation = await this.validateInstitutionUniqueFields(institutionData);
      if (!uniqueFieldsValidation.success)
        return uniqueFieldsValidation;

      const fieldsToUpdate = {};

      const fieldsSettedResult = this.setFieldsToUpdate(
        institution,
        institutionData,
        fieldsToUpdate,
      );
      if (!fieldsSettedResult.success && !file)
        return fieldsSettedResult;

      if (fieldsSettedResult.success)
        await this.institutionEventsLogModel.create(
          {
            event_type: eventLogTypes.update,
            data: JSON.stringify(fieldsToUpdate),
            institution_id: institution.id,
          },
          this.uow.transaction,
        );

      // Logo da instituição é atualizado direto, sem passar por auditoria de curador
      await this.saveLogo(file, photoDateTime, institution, this.uow.transaction);

      if (institution.status === institutionStatus.refused && fieldsSettedResult.success) {
        institution.merge({
          status: institutionStatus.underReview,
        });

        await institution.save(this.uow.transaction);
      }

      await this.uow.commitTransaction();

      return { success: true, data: 'Pedido de atualização efetuado com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      await this.deleteLogo(file, photoDateTime);

      throw error;
    }
  }

  async validateInstitutionUniqueFields(institutionData) {
    const institutionEmail = await this.institutionModel.findBy('email', institutionData.email);
    if (institutionEmail && Number(institutionData.id) !== institutionEmail.id) {
      return { success: false, data: new BusinessException('Email já registrado') };
    }

    const institutionCNPJ = await this.institutionModel.findBy('cnpj', institutionData.cnpj);
    if (institutionCNPJ && Number(institutionData.id) !== institutionCNPJ.id) {
      return { success: false, data: new BusinessException('CNPJ já registrado') };
    }

    return { success: true, data: null };
  }

  async saveLogo(file, photoDateTime, institution, transaction) {
    if (!file)
      return;

    const allowedTypes = Config.get('files.allowedTypes');
    if (!allowedTypes.has(file.type))
      throw new BusinessException('Tipo de arquivo não suportado');

    const maxSize = Config.get('files.maxSize');
    if (maxSize < file.size)
      throw new BusinessException(`Tamanho maximo do arquivo deve ser ${maxSize}`);

    const logo = await this.fileStorageProvider
      .saveFile({ file: file.value, path: `${UploadHelper.getInstitutionUploadPath()}/${photoDateTime}-${file.name}` });

    if (!logo.success)
      throw new GenericException('Erro ao salvar foto');

    institution.merge({
      logo: logo.path,
    });

    await institution.save(transaction);
  }

  deleteLogo(file, photoDateTime) {
    if (!file)
      return null;

    return this.fileStorageProvider
      .deleteFile({ path: `${UploadHelper.getInstitutionUploadPath()}/${photoDateTime}-${file.name}` });
  }

  setFieldsToUpdate(institution, institutionData, fieldsToUpdate) {
    Object.keys(institution.$attributes).forEach(key => {
      // eslint-disable-next-line eqeqeq
      if (institution[key] != institutionData[key]) {
        // eslint-disable-next-line no-param-reassign
        fieldsToUpdate[key] = institutionData[key];
      }
    });

    const hasFieldsToUpdate = Object.values(fieldsToUpdate).some((field) => field !== undefined);

    if (!hasFieldsToUpdate)
      return { success: false, data: new BusinessException('Necessário informar campos para serem alterados na instituição') };

    return { success: true };
  }
}

module.exports = RequestInstitutionUpdateUseCase;
