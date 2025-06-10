const app = require("./app");
const { resetData } = require("./schema");

resetData();

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000/graphql");
});
