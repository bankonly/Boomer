const log = require("chalk");
require("../app_config/start_up_config");

try {
  const { sequelize } = require("../app_config/database");
  const commandList = ["migrate", "refresh", "truncate"];
  var commands = process.argv[process.argv.length - 1];

  if (process.argv.length > 3) {
    console.log(log.red("db: Invalid command"));
    return;
  }

  const isCommandMatched = commandList.includes(commands);
  if (!isCommandMatched) {
    console.log(log.red("db: Do you mean this?"));
    console.log(log.red("---------------------"));
    commandList.map((value, index) =>
      console.log(log.red(index + 1 + ". " + value))
    );
    console.log(log.red("---------------------"));

    return;
  }

  async function FKControll(value) {
    await sequelize.query("SET FOREIGN_KEY_CHECKS =" + value);
  }

  // migrate
  if (commands == commandList[0]) {
    sequelize.sync();
    console.log(log.green(`db: datase has been migrated`));
    return;
  }
  // migrate
  if (commands == commandList[2]) {
    sequelize.sync({ force: true });
    console.log(log.green(`db: datase has been truncated`));
    return;
  }
} catch (error) {
  console.log(log.red(error.message));
}
