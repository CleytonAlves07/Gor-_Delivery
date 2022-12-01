const errorMiddleware = (err, _request, response, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro inesperado. Por favor, tente mais tarde';

return response.status(status).json({ message });
  };
  
  module.exports = errorMiddleware;