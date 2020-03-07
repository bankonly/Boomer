const fs = require("fs");

const {
  addPropertyToNpmCommand,
  readJsonCmd
} = require("../app_config/commands");

const METHOD = "commands";
const READPATH = "./app_config/defaults/";
const WRITEPATH = "./apps/Commands/";
const FILETYPE = "js";
const READFILENAME = "Command.txt.example";
const DECODETYPE = "utf8";

const fileName = process.argv[process.argv.length - 1];

const CREATE = () => {
  addPropertyToNpmCommand({ propertyName: fileName, method: METHOD });
  fs.readFile(READPATH + READFILENAME, DECODETYPE, (err, data) => {
    if (err) console.log(err);
    else {
      fs.writeFile(`${WRITEPATH}${fileName}.${FILETYPE}`, data, err => {
        if (err) console.log(err);
        console.log(`${METHOD} ${fileName} CREATED`);
      });
    }
  });
};

readJsonCmd((err, data) => {
  const commands = JSON.parse(data).commands;
  if (commands.length < 1) {
    CREATE();
    return;
  } else {
    let create = true;
    for (var i = 0; i <= commands.length; i++) {
      if (commands[i] == fileName) {
        console.log("this " + fileName + " is already exist");
        create = false;
        return;
      }
    }

    if (create) {
      CREATE();
      return;
    }
  }
});
