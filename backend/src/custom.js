document.addEventListener('DOMContentLoaded', function () {
  // Disable automatic redirection in Swagger UI
  const handleRedirection = () => {
    const execute = window.SwaggerUIBundle.ui.execute;
    window.SwaggerUIBundle.ui.execute = function () {
      if (arguments[0] === 'requestRedirect') {
        return;
      }
      return execute.apply(this, arguments);
    };
  };

  handleRedirection();
});
