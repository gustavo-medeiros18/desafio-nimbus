const controller = require("./controller");

module.exports = {
  execute() {
    // TODO: tratamento da requisição e resposta do caso de uso
    const alerts = controller.execute();

    return alerts;
  },
};
