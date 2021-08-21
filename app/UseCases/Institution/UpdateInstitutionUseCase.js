const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const slugify = require('slugify');

const NotFoundException = use('App/Exceptions/NotFoundException');

const BusinessException = use('App/Exceptions/BusinessException');

const Hash = use('Hash');

class UpdateInstitutionUseCase {
  static get inject() {
    return ['App/Models/Institution',
      'App/Models/InstitutionEventsLog',
      'App/Models/Shared/UnitOfWork'];
  }

  constructor(institutionModel, institutionEventsLogModel, uow) {
    this.institutionModel = institutionModel;
    this.institutionEventsLogModel = institutionEventsLogModel;
    this.uow = uow;
  }

  async execute(institutionData) {
    const institution = await this.institutionModel.find(institutionData.id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não encontrada') };
    }

    const slug = slugify(`${institutionData.name}`, {
      replacement: '-',
      lower: true,
    });

    const institutionEmail = await this.institutionModel.findBy('email', institutionData.email);
    if (institutionEmail && Number(institutionData.id) !== institutionEmail.id) {
      return { success: false, data: new BusinessException('Email já registrado') };
    }

    const institutionCNPJ = await this.institutionModel.findBy('cnpj', institutionData.cnpj);
    if (institutionCNPJ && Number(institutionData.id) !== institutionCNPJ.id) {
      return { success: false, data: new BusinessException('CNPJ já registrado') };
    }

    try {
      await this.uow.startTransaction();

      institution.merge({
        ...institutionData,
        ...institutionData.password && { password: await Hash.make(institutionData.password) },
        slug,
      });

      await institution.save(this.uow.transaction);

      await this.institutionEventsLogModel.create({
        event_type: eventLogTypes.update,
        data: institution.toJSON(),
        institution_id: institution.id,
      });

      await this.uow.commitTransaction();

      return { success: true, data: institution };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = UpdateInstitutionUseCase;
