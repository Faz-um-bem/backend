const { curatorStatus } = use('App/Models/Enums/Curator');
const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

const NotFoundException = use('App/Exceptions/NotFoundException');

class AuditCuratorUseCase {
  static get inject() {
    return ['App/Models/Curator', 'App/Models/CuratorEventsLog', 'App/Models/Shared/UnitOfWork'];
  }

  constructor(curatorModel, curatorEventsLogModel, uow) {
    this.curatorModel = curatorModel;
    this.curatorEventsLogModel = curatorEventsLogModel;
    this.uow = uow;
  }

  async execute(auditCuratorData) {
    try {
      await this.uow.startTransaction();

      const eventLog = await this.curatorEventsLogModel
        .query()
        .where({
          status: eventLogStatus.underReview,
          curator_id: auditCuratorData.id,
        })
        .first();
      if (!eventLog)
        return { success: false, data: new NotFoundException('Registro de cadastro de curador não encontrado') };

      const curator = await this.curatorModel.find(auditCuratorData.id);
      if (!curator)
        return { success: false, data: new NotFoundException('Curador não encontrado') };

      if (auditCuratorData.approved) {
        eventLog.merge({
          curator_reviewer_id: auditCuratorData.curator_reviewer_id,
          curator_review: auditCuratorData.curator_review,
          status: eventLogStatus.approved,
        });

        await eventLog.save(this.uow.transaction);

        curator.merge({
          status: curatorStatus.approved,
        });

        await curator.save(this.uow.transaction);
      } else {
        eventLog.merge({
          curator_reviewer_id: auditCuratorData.curator_reviewer_id,
          curator_review: auditCuratorData.curator_review,
          status: eventLogStatus.rejected,
        });

        await eventLog.save(this.uow.transaction);

        curator.merge({
          status: curatorStatus.refused,
        });

        await curator.save(this.uow.transaction);
      }

      await this.uow.commitTransaction();

      return { success: true, data: 'Curador auditado com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = AuditCuratorUseCase;
