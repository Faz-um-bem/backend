const { ServiceProvider } = require('@adonisjs/fold');

const Uuid = use('Providers/Uuid');

class UuidServiceProvider extends ServiceProvider {
  register() {
    this.app.bind('Uuid', () => new Uuid());
  }
}

module.exports = UuidServiceProvider;
