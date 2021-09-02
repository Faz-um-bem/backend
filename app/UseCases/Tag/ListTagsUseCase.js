class ListTagsUseCase {
  static get inject() {
    return ['App/Models/Tag'];
  }

  constructor(tagModel) {
    this.tagModel = tagModel;
  }

  execute() {
    return this.tagModel.all();
  }
}

module.exports = ListTagsUseCase;
