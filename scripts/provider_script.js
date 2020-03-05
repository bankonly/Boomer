const fs = require("fs");

const {
  readJsonCmd,
  addPropertyToNpmCommand
} = require("../app_config/commands");

const METHOD = "providers";
const READPATH = "./app_config/defaults/";
const WRITEPATH = "./apps/Providers/";
const FILETYPE = "js";
const READFILENAME = "Provider.txt.example";
const DECODETYPE = "utf8";

const fileName = process.argv[process.argv.length - 1];

try {
  const params = process.argv[process.argv.length - 1].split(":");
  if (params.length < 2) {
    console.log("ERROR: make:provider Providername:ControllerName");
    return;
  }
  const fileName = params[0];
  const controllerName = params[1];

  const CREATE = () => {
    readJsonCmd((err, data) => {
      const controllers = JSON.parse(data).controllers;
      if (controllers.length < 1) {
        console.log("there is no controller yet");
        return;
      }
      controllers.forEach((value, index) => {
        if (value == controllerName) {
          addPropertyToNpmCommand({ propertyName: fileName, method: METHOD });
          fs.readFile(READPATH + READFILENAME, DECODETYPE, (err, data) => {
            if (err) console.log(err);
            else {
              data = data.replace(/ControllerName/g, controllerName);
              data = data.replace(/ProviderName/g, fileName);
              fs.writeFile(`${WRITEPATH}${fileName}.${FILETYPE}`, data, err => {
                if (err) console.log(err);
                console.log(`${METHOD} ${fileName} CREATED`);
              });
            }
          });
          console.log(METHOD + " CREATED");
          return;
        }
        console.log("this " + controllerName + " does not already exist");
        return false;
      });
    });
  };

  readJsonCmd((err, data) => {
    const providers = JSON.parse(data).providers;
    if (providers.length < 1) {
      CREATE();
      return;
    }
    providers.forEach((value, index) => {
      if (value == fileName) {
        console.log("this " + fileName + " " + METHOD + "  already exist");
        return;
      } else {
        CREATE();
        return;
      }
    });
  });
} catch (error) {
  console.log(error.message);
}
