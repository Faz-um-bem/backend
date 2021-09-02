const { Buffer } = require('buffer');
const isBase64 = require('is-base64');
const { join } = require('path');

const Helpers = use('Helpers');

class FileStorageProvider {
  static get inject() {
    return ['Drive'];
  }

  constructor(fileStorageProvider) {
    this.fileStorageProvider = fileStorageProvider;
  }

  async saveFile({ file, path }) {
    try {
      if (!isBase64(file))
        throw new Error('Invalid file encoding');

      await this.fileStorageProvider.put(path, Buffer.from(file, 'base64'));

      return { success: true, path };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getFile({ path, returnStream = false }) {
    try {
      const fileExists = await this.fileExists({ path });

      if (!fileExists)
        throw new Error('File does not exists');

      const file = returnStream
        ? this.fileStorageProvider.getStream(this.getFileFullPath({ path }))
        : this.fileStorageProvider.get(this.getFileFullPath({ path }));

      return { success: true, file };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteFile({ path }) {
    try {
      const fileExists = await this.fileExists({ path });

      if (!fileExists)
        throw new Error('File does not exists');

      await this.fileStorageProvider.delete(this.getFileFullPath({ path }));

      return { success: true, message: 'File successfully deleted' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  fileExists({ path }) {
    const filePath = this.getFileFullPath({ path });

    return this.fileStorageProvider.exists(filePath);
  }

  getFileFullPath({ path }) {
    return join(Helpers.publicPath(), path);
  }
}

module.exports = FileStorageProvider;
