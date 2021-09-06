const Hash = use('Hash');

const BusinessException = use('App/Exceptions/BusinessException');
const NotFoundException = use('App/Exceptions/NotFoundException');

class UpdatePasswordUseCase {
  static get inject() {
    return ['App/Models/Curator'];
  }

  constructor(curatorModel) {
    this.curatorModel = curatorModel;
  }

  async execute(updatePasswordData) {
    const curator = await this.curatorModel.find(updatePasswordData.id);
    if (!curator)
      return { success: false, data: new NotFoundException('Curador não encontrado') };

    if (!await Hash.verify(updatePasswordData.password, curator.password))
      return { success: false, data: new BusinessException('Senha atual incorreta') };

    curator.merge({
      password: await Hash.make(updatePasswordData.new_password),
    });

    await curator.save();

    return { success: true, data: 'Senha trocada com sucesso' };
  }
}

module.exports = UpdatePasswordUseCase;
