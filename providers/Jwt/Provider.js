const { ServiceProvider } = require('@adonisjs/fold');

const Jwt = use('Providers/Jwt');

class JwtServiceProvider extends ServiceProvider {
  register() {
    this.app.bind('Jwt', () => {
      const secretKey = this.app.use('Adonis/Src/Env').get('APP_KEY');

      return new Jwt({ secretKey });
    });
  }
}

module.exports = JwtServiceProvider;
