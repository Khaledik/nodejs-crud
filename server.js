const app = require("./app");
require("dotenv").config();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON : localhost:${port}`);
});
