const fs = require("fs");

const {
  addPropertyToNpmCommand,
  readJsonCmd
} = require("../app_config/commands");

const METHOD = "controllers";
const READPATH = "./app_config/defaults/";
const WRITEPATH = "./apps/Controllers/";
const FILETYPE = "js";
const READFILENAME = "Controller.txt.example";
const DECODETYPE = "utf8";

const fileName = process.argv[process.argv.length - 1];

const CREATE = () => {
  addPropertyToNpmCommand({ propertyName: fileName, method: METHOD });
  fs.readFile(READPATH + READFILENAME, DECODETYPE, (err, data) => {
    if (err) console.log(err);
    else {
      data = data.replace(/ControllerName/g, fileName);
      fs.writeFile(`${WRITEPATH}${fileName}.${FILETYPE}`, data, err => {
        if (err) console.log(err);
        console.log(`${METHOD} ${fileName} CREATED`);
      });
    }
  });
};

readJsonCmd((err, data) => {
  const controllers = JSON.parse(data).controllers;
  if (controllers.length < 1) {
    CREATE();
    return;
  } else {
    controllers.forEach((value, index) => {
      if (value == fileName) {
        console.log("this " + fileName + " is already exist");
        return;
      } else {
        addPropertyToNpmCommand({ propertyName: fileName, method: METHOD });

        CREATE();
        return;
      }
    });
  }
});
