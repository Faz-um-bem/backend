const Hash = use('Hash');

const BusinessException = use('App/Exceptions/BusinessException');
const NotFoundException = use('App/Exceptions/NotFoundException');

class UpdatePasswordUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(updatePasswordData) {
    const institution = await this.institutionModel.find(updatePasswordData.id);
    if (!institution)
      return { success: false, data: new NotFoundException('Instituição não encontrada') };

    if (!await Hash.verify(updatePasswordData.password, institution.password))
      return { success: false, data: new BusinessException('Senha atual incorreta') };

    institution.merge({
      password: await Hash.make(updatePasswordData.new_password),
    });

    await institution.save();

    return { success: true, data: 'Senha trocada com sucesso' };
  }
}

module.exports = UpdatePasswordUseCase;
