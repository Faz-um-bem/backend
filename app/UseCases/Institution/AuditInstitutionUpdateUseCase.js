const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

const SlugHelper = use('App/Helpers/Slug');

const NotFoundException = use('App/Exceptions/NotFoundException');

class AuditInstitutionUpdateUseCase {
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
        event_type: 1,
        institution_id: requestData.id,
      })
      .first();

    if (!institutionEventLog) {
      return { success: false, data: new NotFoundException('Não há solicitação de atualização') };
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
          ...institutionEventLog.data,
          ...institutionEventLog.data.name
          && { slug: SlugHelper.createSlug({ text: institutionEventLog.data.name }) },
        });

        await institution.save(this.uow.transaction);

        await this.uow.commitTransaction();

        return { success: true, data: 'Atualização aprovada com sucesso' };
      }

      institutionEventLog.merge({
        status: eventLogStatus.rejected,
        curator_review: requestData.curator_review,
        curator_id: requestData.curator_id,
      });
      await institutionEventLog.save(this.uow.transaction);

      await this.uow.commitTransaction();

      return { success: true, data: 'Atualização rejeitada com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = AuditInstitutionUpdateUseCase;
