const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const NotFoundException = use('App/Exceptions/NotFoundException');

const BusinessException = use('App/Exceptions/BusinessException');

class RequestInstitutionUpdateUseCase {
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
    const institutionEventLog = await this.institutionEventsLogModel
      .query()
      .where({
        status: 2,
        event_type: 1,
        institution_id: institutionData.id,
      })
      .first();

    if (institutionEventLog) {
      return { success: false, data: new BusinessException('Instituição já possui atualização em análise') };
    }

    const institution = await this.institutionModel.find(institutionData.id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não encontrada') };
    }

    const institutionEmail = await this.institutionModel.findBy('email', institutionData.email);
    if (institutionEmail && Number(institutionData.id) !== institutionEmail.id) {
      return { success: false, data: new BusinessException('Email já registrado') };
    }

    const institutionCNPJ = await this.institutionModel.findBy('cnpj', institutionData.cnpj);
    if (institutionCNPJ && Number(institutionData.id) !== institutionCNPJ.id) {
      return { success: false, data: new BusinessException('CNPJ já registrado') };
    }

    const updateRequestData = {};

    // Salva em updateRequestData apenas os dados alterados na instituição
    Object.keys(institution.$attributes).forEach(key => {
      if (institution[key] != institutionData[key]) {
        updateRequestData[key] = institutionData[key];
      }
    });

    try {
      await this.uow.startTransaction();

      await this.institutionEventsLogModel.create({
        event_type: eventLogTypes.update,
        data: JSON.stringify(updateRequestData),
        institution_id: institution.id,
      });

      await this.uow.commitTransaction();

      return { success: true, data: 'Pedido de atualização efetuado com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = RequestInstitutionUpdateUseCase;
