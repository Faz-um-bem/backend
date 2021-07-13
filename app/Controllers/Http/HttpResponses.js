const GenericException = use('App/Exceptions/GenericException');

function ok(data) {
  return {
    statusCode: 200,
    message: null,
    data,
  };
}

function created(data) {
  return {
    statusCode: 201,
    message: null,
    data,
  };
}

function noContent() {
  return {
    statusCode: 204,
    message: null,
    data: null,
  };
}

function badRequest(message) {
  return {
    statusCode: 400,
    message,
    data: null,
  };
}

function notFound(message) {
  return {
    statusCode: 404,
    message,
    data: null,
  };
}

function serverError(message) {
  return {
    statusCode: 500,
    message: `Aconteceu um erro inesperado no servidor: ${message}`,
    data: null,
  };
}

function handleError(error) {
  if (!(error instanceof Error)) { throw new GenericException('error must be a instance of Error'); }

  let response = {};

  switch (error.status) {
    case 400:
      response = badRequest(error.message);
      break;
    case 404:
      response = notFound(error.message);
      break;
    default:
      response = serverError(error.message);
      break;
  }

  return response;
}

module.exports = {
  ok, created, noContent, badRequest, notFound, serverError, handleError,
};
