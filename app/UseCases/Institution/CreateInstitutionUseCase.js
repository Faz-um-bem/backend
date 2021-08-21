const { institutionStatus } = use('App/Models/Enums/Institution');

const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const slugify = require('slugify');

const Hash = use('Hash');

class CreateInstitutionUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Institution', 'App/Models/InstitutionEventsLog', 'App/Models/Shared/UnitOfWork'];
  }

  // Recebe dependências declaradas no inject
  constructor(institutionModel, institutionEventsLogModel, uow) {
    this.institutionModel = institutionModel;
    this.institutionEventsLogModel = institutionEventsLogModel;
    this.uow = uow;
  }

  async execute(institutionData) {
    const slug = slugify(`${institutionData.name}`, {
      replacement: '-',
      lower: true,
    });

    try {
      await this.uow.startTransaction();

      const institution = await this.institutionModel.create(
        {
          ...institutionData,
          status: institutionStatus.underReview,
          password: await Hash.make(institutionData.password),
          slug,
        },
        this.uow.transaction,
      );

      await this.institutionEventsLogModel.create(
        {
          event_type: eventLogTypes.create,
          data: institution.toJSON(),
          institution_id: institution.id,
        },
        this.uow.transaction,
      );

      await this.uow.commitTransaction();

      return institution;
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = CreateInstitutionUseCase;
