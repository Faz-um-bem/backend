const NotFoundException = use('App/Exceptions/NotFoundException');
const BusinessException = use('App/Exceptions/BusinessException');

const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const Hash = use('Hash');

class UpdateCuratorUseCase {
  static get inject() {
    return [
      'App/Models/Curator',
      'App/Models/CuratorEventsLog',
      'App/Models/Shared/UnitOfWork',
    ];
  }

  constructor(curatorModel, curatorEventsLogModel, uow) {
    this.curatorModel = curatorModel;
    this.curatorEventsLogModel = curatorEventsLogModel;
    this.uow = uow;
  }

  async execute(curatorData) {
    const curator = await this.curatorModel.find(curatorData.id);

    if (!curator) {
      return { success: false, data: new NotFoundException('Curador não encontrado') };
    }

    const emailExist = await this.curatorModel.findBy('email', curatorData.email);

    if (emailExist && (Number(curatorData.id) !== emailExist.id)) {
      return { success: false, data: new BusinessException('E-mail já registrado') };
    }

    try {
      await this.uow.startTransaction();

      const attCurator = {
        ...curatorData,
        ...curatorData.password && {
          password: await Hash.make(curatorData.password),
        },
      };

      curator.merge(attCurator);

      await curator.save(this.uow.transaction);

      await this.curatorEventsLogModel.create(
        {
          event_type: eventLogTypes.update,
          data: curator.toJSON(),
          curator_id: curator.id,
        },
        this.uow.transaction,
      );

      await this.uow.commitTransaction();

      return { success: true, data: curator };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = UpdateCuratorUseCase;
