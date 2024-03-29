const controller = require("./controller");

module.exports = {
  async execute(req, res) {
    // TODO: tratamento da requisição e resposta do caso de uso
    const dateStart = req.query.dateStart;
    const dateEnd = req.query.dateEnd;

    try {
      const alerts = await controller.execute(dateStart, dateEnd);

      res.status(200).json(alerts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
