const fs = require("fs");

const {
  readJsonCmd,
  addPropertyToNpmCommand
} = require("../app_config/commands");

const METHOD = "resources";
const READPATH = "./app_config/defaults/";
const WRITEPATH = "./apps/Resources/";
const FILETYPE = "js";
const READFILENAME = "Resource.txt.example";
const DECODETYPE = "utf8";

const fileName = process.argv[process.argv.length - 1];

try {
  const params = process.argv[process.argv.length - 1].split(":");
  if (params.length < 2) {
    console.log("ERROR: make:resource ResourceName:ControllerName");
    return;
  }
  const fileName = params[0];
  const controllerName = params[1];

  const CREATE = () => {
    addPropertyToNpmCommand({ propertyName: fileName, method: METHOD });

    fs.readFile(READPATH + READFILENAME, DECODETYPE, (err, data) => {
      if (err) console.log(err);
      else {
        data = data.replace(/ControllerName/g, controllerName);
        fs.writeFile(`${WRITEPATH}${fileName}.${FILETYPE}`, data, err => {
          if (err) console.log(err);
          console.log(`${METHOD} ${fileName} CREATED`);
        });
      }
    });
    console.log(METHOD + " CREATED");
  };

  readJsonCmd((err, data) => {
    const controllers = JSON.parse(data).controllers;
    if (controllers.length < 1) {
      console.log("this " + controllerName + " " + METHOD + " does not exist");
      return;
    }
    let isControllerExist = false;
    for (var i = 0; i <= controllers.length; i++) {
      if (controllers[i] == controllerName) {
        readJsonCmd((err, data) => {
          const resources = JSON.parse(data).resources;
          if (resources.length < 1) {
            CREATE();
            return;
          }
          let create = true;
          for (var i = 0; i <= resources.length; i++) {
            if (resources[i] == fileName) {
              console.log("this " + fileName + " already exist");
              create = false;
              return;
            }
          }
          if (create) {
            CREATE();
          }
        });
        return;
      }
    }
    console.log("this " + controllerName + " " + METHOD + " does not exist");
  });
} catch (error) {
  console.log(error.message);
}
