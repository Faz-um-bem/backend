const { ok, badRequest } = use('App/Controllers/Http/HttpResponses');

class LoginController {
  async handle({ request, auth, response }) {
    try {
      const { email, password } = request.post();

      const token = await auth.authenticator('institution').attempt(email, password);

      response.status(200);
      return ok({ token: token.token });
    } catch (error) {
      response.status(400);
      return badRequest('Erro ao realizar login');
    }
  }
}

module.exports = LoginController;
