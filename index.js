const server = require("./src/server");
const { execute } = require("./src/get-damage-summary-by-date/repository");

const port = process.env.PORT || 3333;
server.listen(port, () => {
  execute();

  console.log(`Running server on port ${port}`);
});
