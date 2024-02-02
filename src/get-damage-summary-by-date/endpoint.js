const controller = require("./controller");

module.exports = {
  execute(dateStart, dateEnd) {
    // TODO: tratamento da requisição e resposta do caso de uso
    const alerts = controller.execute(dateStart, dateEnd);

    return alerts;
  },
};
