const fs = require("fs");

const {
  addPropertyToNpmCommand,
  readJsonCmd
} = require("../app_config/commands");

const METHOD = "models";
const READPATH = "./app_config/defaults/";
const WRITEPATH = "./apps/Models/";
const FILETYPE = "js";
const READFILENAME = "Model.txt.example";
const DECODETYPE = "utf8";

try {
  const params = process.argv[process.argv.length - 1].split(":");
  if (params.length < 2) {
    console.log("ERROR: make:model ModeName:TableName");
    return;
  }
  const fileName = params[0];
  const tableName = params[1];

  const CREATE = () => {
    addPropertyToNpmCommand({ propertyName: fileName, method: METHOD });
    fs.readFile(READPATH + READFILENAME, DECODETYPE, (err, data) => {
      console.log(tableName);
      if (err) console.log(err);
      else {
        data = data.replace(/DefineModelName/g, fileName);
        data = data.replace(/TableName/g, tableName);

        fs.writeFile(`${WRITEPATH}${fileName}.${FILETYPE}`, data, err => {
          if (err) console.log(err);
          console.log(`${METHOD} ${fileName} CREATED`);
        });
      }
    });
  };

  readJsonCmd((err, data) => {
    const models = JSON.parse(data).models;
    if (models.length < 1) {
      CREATE();
      return;
    }
    let create = true;
    for (var i = 0; i <= models.length; i++) {
      if (models[i] == fileName) {
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
