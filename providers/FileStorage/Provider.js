const { ServiceProvider } = require('@adonisjs/fold');

class FileStorageServiceProvider extends ServiceProvider {
  register() {
    this.app.bind('FileStorage', () => make('Providers/FileStorage'));
  }
}

module.exports = FileStorageServiceProvider;
