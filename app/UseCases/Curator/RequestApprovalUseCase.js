const { eventLogTypes, eventLogStatus } = use('App/Models/Enums/EventsLogs');
const { curatorStatus } = use('App/Models/Enums/Curator');

const BusinessException = use('App/Exceptions/BusinessException');
const NotFoundException = use('App/Exceptions/NotFoundException');

class RequestApprovalUseCase {
  static get inject() {
    return ['App/Models/Curator', 'App/Models/CuratorEventsLog', 'App/Models/Shared/UnitOfWork'];
  }

  constructor(curatorModel, curatorEventsLogModel, uow) {
    this.curatorModel = curatorModel;
    this.curatorEventsLogModel = curatorEventsLogModel;
    this.uow = uow;
  }

  async execute(curatorId) {
    try {
      await this.uow.startTransaction();

      const curator = await this.curatorModel.find(curatorId);
      if (!curator)
        return { success: false, data: new NotFoundException('Curador não encontrado') };

      if (curator.status !== curatorStatus.refused)
        return { success: false, data: new BusinessException('Só é possível solicitar aprovação de um curador com status "Recusado"') };

      const eventLogUnderReview = await this.curatorEventsLogModel
        .query()
        .where({ curator_id: curatorId, status: eventLogStatus.underReview })
        .first();
      if (eventLogUnderReview)
        return { success: false, data: new BusinessException('Curador já possui um pedido em análise') };

      await this.curatorEventsLogModel.create(
        {
          curator_id: curatorId,
          event_type: eventLogTypes.requestApproval,
        },
        this.uow.transaction,
      );

      curator.merge({
        status: eventLogStatus.underReview,
      });

      await curator.save(this.uow.transaction);

      await this.uow.commitTransaction();

      return { success: true, data: 'Pedido de aprovação enviado com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = RequestApprovalUseCase;
