const Logger = use('Logger');

class BaseController {
  async handle({ request, response, params }) {
    try {
      const requestData ={...request.all(), ...params};

      const {
        statusCode,
        message = null,
        data = null,
      } = await this.controllerOperation(requestData);

      response.status(statusCode);

      return statusCode !== 204 ? { message, data } : null;
    } catch (error) {
      Logger.error('A error happened: %j', {
        url: request.url(),
        message: error.message,
        date: new Date(),
        stackTrace: error.stack,
      });

      response.status(500);

      return { message: error.message, data: null };
    }
  }
}

module.exports = BaseController;
