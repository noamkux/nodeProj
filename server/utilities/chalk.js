const chalk = require("chalk");

const log = {
  err: function (arg) {
    return console.log(chalk.bold.red(arg));
  },
  sucsses: function (arg) {
    return console.log(chalk.bold.green(arg));
  },
};

module.exports = log;
