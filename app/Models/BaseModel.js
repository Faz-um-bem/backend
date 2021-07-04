const Model = use('Model');

class BaseModel extends Model {
  static get hiddenFields() {
    return ['created_at', 'updated_at'];
  }

  // Fields ignored on model serialization
  static get hidden() {
    return this.hiddenFields;
  }

  /**
   * Return a list of registers paginated
   * @param {Number} page Page number
   * @param {Number} registersPerPage Number of registers to get per page
   * @param {object} conditions Conditions to use in the query
   * @returns {Promise<object>} Pagination object
   */
  static async paginate(page = 1, registersPerPage = 1, conditions = {}) {
    return this.query().where(conditions).paginate(page, registersPerPage);
  }

  /**
   * Update registers of the model
   * @param {object} conditions Conditions to update model registers
   * @param {object} fieldsToUpdate Model properties to be updated
   * @returns {Promise<number>} Number of registers updated
   */
  static async bulkUpdate(conditions = {}, fieldsToUpdate = {}) {
    return this.query().where(conditions).update(fieldsToUpdate);
  }

  /**
   * Update a model instance
   * @param {object} data Data to update model instance
   * @returns {Promise<object>}
   */
  async update(data) {
    this.merge(data);

    return this.save();
  }
}

module.exports = BaseModel;
