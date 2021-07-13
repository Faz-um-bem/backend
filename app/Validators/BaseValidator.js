class BaseValidator {
  async fails(errorMessages) {
    return this.ctx.response.status(400).send({
      message: errorMessages[0].message, data: null,
    });
  }
}

module.exports = BaseValidator;
