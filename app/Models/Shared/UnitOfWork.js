const InvalidTransactionException = use('App/Models/Shared/Exceptions/InvalidTransactionException');

class UnitOfWork {
  static get inject() {
    return ['Database'];
  }

  constructor(databaseProvider) {
    this.databaseProvider = databaseProvider;

    this.transaction = null;
  }

  get isTransactionOpen() {
    return !!this.transaction;
  }

  async startTransaction() {
    if (this.transaction !== null) { return; }

    const transaction = await this.databaseProvider.beginTransaction();

    this.transaction = transaction;
  }

  async commitTransaction() {
    if (!this.isTransactionOpen) { throw new InvalidTransactionException(); }

    await this.transaction.commit();
  }

  async rollbackTransaction() {
    if (!this.isTransactionOpen) { throw new InvalidTransactionException(); }

    await this.transaction.rollback();
  }
}

module.exports = UnitOfWork;
