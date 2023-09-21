const express = require("express");
require("dotenv").config();
const monsoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const log = require("./utilities/chalk.js")


const register = require("./routes/register");
const login = require("./routes/login");
const users = require("./routes/users")
const cards = require("./routes/cards")

monsoose
  .connect(process.env.DB, { useNewUrlParser: true, dbName:"b-card" } )
  .then(() => log.sucsses("DB Connected"))
  .catch((err) => error(err)); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/users", users)
app.use("/api/cards", cards)


app.listen(port, () => {
  log.sucsses(`Server is running on port ${port}`);
});
