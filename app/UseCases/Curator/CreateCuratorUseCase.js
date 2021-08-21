const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const Hash = use('Hash');

class CreateCuratorUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Curator', 'App/Models/CuratorEventsLog', 'App/Models/Shared/UnitOfWork'];
  }

  // Recebe dependências declaradas no inject
  constructor(curatorModel, curatorEventsLogModel, uow) {
    this.curatorModel = curatorModel;
    this.curatorEventsLogModel = curatorEventsLogModel;
    this.uow = uow;
  }

  async execute(curatorData) {
    try {
      await this.uow.startTransaction();

      const curator = await this.curatorModel.create(
        {
          ...curatorData,
          password: await Hash.make(curatorData.password),
        },
        this.uow.transaction,
      );

      await this.curatorEventsLogModel.create(
        {
          event_type: eventLogTypes.create,
          data: curator.toJSON(),
          curator_id: curator.id,
        },
        this.uow.transaction,
      );

      await this.uow.commitTransaction();

      return curator;
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = CreateCuratorUseCase;
