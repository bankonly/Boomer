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

  const fileName = params[0];
  const controllerName = params[1];

  if (params.length < 2) {
    readJsonCmd((err, data) => {
      const providers = JSON.parse(data).providers;
      if (providers.length < 1) {
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
      let create = true;
      for (var i = 0; i <= providers.length; i++) {
        if (providers[i] == fileName) {
          console.log("this " + fileName + " " + METHOD + "  already exist");
          create = false;
          return;
        }
      }
      if (create) {
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
    });
    return;
  }

  const CREATE = () => {
    readJsonCmd((err, data) => {
      const controllers = JSON.parse(data).controllers;
      if (controllers.length < 1) {
        console.log("there is no controller yet");
        return;
      }
      for (var i = 0; i <= controllers.length; i++) {
        if (controllers[i] == controllerName) {
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
      }
      console.log("this Controller does not already exist");
      return false;
    });
  };

  readJsonCmd((err, data) => {
    const providers = JSON.parse(data).providers;
    if (providers.length < 1) {
      CREATE();
      return;
    }
    let create = true;
    for (var i = 0; i <= providers.length; i++) {
      if (providers[i] == fileName) {
        console.log("this " + fileName + " " + METHOD + "  already exist");
        create = false;
        return;
      }
    }
    if (create) {
      CREATE();
    }
  });
} catch (error) {
  console.log(error.message);
}
