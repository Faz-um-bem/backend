/* eslint-disable global-require */
const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  require('../app/Validators/Extensions').registerValidations();
});
