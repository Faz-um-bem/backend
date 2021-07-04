class BaseController {
  async handle({ request, response }) {
    try {
      const requestData = request.all();

      const {
        statusCode,
        message = null,
        data = null,
      } = await this.controllerOperation(requestData);

      response.status(statusCode);

      return statusCode !== 204 ? { message, data } : null;
    } catch (error) {
      response.status(500);

      return { message: error.message, data: null };
    }
  }
}

module.exports = BaseController;
