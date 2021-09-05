const { eventLogStatus, eventLogTypes } = use('App/Models/Enums/EventsLogs');
const { institutionStatus } = use('App/Models/Enums/Institution');

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
    try {
      await this.uow.startTransaction();

      const institutionEventLog = await this.institutionEventsLogModel
        .query()
        .where({
          status: eventLogStatus.underReview,
          event_type: eventLogTypes.update,
          institution_id: requestData.id,
        })
        .first();
      if (!institutionEventLog)
        return { success: false, data: new NotFoundException('Solicitação de atualização não encontrada') };

      const institution = await this.institutionModel.find(requestData.id);
      if (!institution)
        return { success: false, data: new NotFoundException('Instituição não encontrada') };

      if (requestData.approved) {
        institutionEventLog.merge({
          status: eventLogStatus.approved,
          curator_review: requestData.curator_review,
          curator_id: requestData.curator_id,
        });

        await institutionEventLog.save(this.uow.transaction);

        institution.merge({
          ...institutionEventLog.data,
          ...institutionEventLog.data.name
          && { slug: SlugHelper.createSlug({ text: institutionEventLog.data.name }) },
          status: institutionStatus.approved,
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

      if (institution.status === institutionStatus.underReview) {
        institution.merge({
          status: institutionStatus.refused,
        });

        await institution.save(this.uow.transaction);
      }

      await this.uow.commitTransaction();

      return { success: true, data: 'Atualização rejeitada com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = AuditInstitutionUpdateUseCase;
