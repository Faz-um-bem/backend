const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

const NotFoundException = use('App/Exceptions/NotFoundException');

class AuditInstitutionCreateUseCase {
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

  async execute(requestData) {
    const institutionEventLog = await this.institutionEventsLogModel
      .query()
      .where({
        status: 2,
        event_type: 0,
        institution_id: requestData.id,
      })
      .first();

    if (!institutionEventLog) {
      return { success: false, data: new NotFoundException('Não há solicitação de criação') };
    }

    try {
      await this.uow.startTransaction();

      if (requestData.approved) {
        institutionEventLog.merge({
          status: eventLogStatus.approved,
          curator_review: requestData.curator_review,
          curator_id: requestData.curator_id,
        });
        await institutionEventLog.save(this.uow.transaction);

        const institution = await this.institutionModel.find(requestData.id);

        institution.merge({
          status: eventLogStatus.approved,
        });

        await institution.save(this.uow.transaction);

        await this.uow.commitTransaction();

        return { success: true, data: 'Criação de instituição aprovada com sucesso' };
      }

      institutionEventLog.merge({
        status: eventLogStatus.rejected,
        curator_review: requestData.curator_review,
        curator_id: requestData.curator_id,
      });
      await institutionEventLog.save(this.uow.transaction);

      const institution = await this.institutionModel.find(requestData.id);

      institution.merge({
        status: eventLogStatus.rejected,
      });

      await institution.save(this.uow.transaction);

      await this.uow.commitTransaction();

      return { success: true, data: 'Criação de instituição rejeitada com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = AuditInstitutionCreateUseCase;
