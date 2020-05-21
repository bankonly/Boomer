const fs = require("fs");
const log = require("chalk");

const controllerPath = "./apps/Controllers/";
const METHOD = "resources";
const READPATH = "./app_config/defaults/";
var WRITEPATH = "./apps/Resources/";
const FILETYPE = "js";
const READFILENAME = "Resource.txt.example";
const DECODETYPE = "utf8";

try {
  const params = process.argv[process.argv.length - 1];
  var fileName = params;
  const controllerName = params[1];

  const commands = fileName.split("/");

  if (commands.length > 1) {
    fileName = commands[1];
    // connect string to get correct path
    WRITEPATH = WRITEPATH.concat(commands[0] + "/");
    if (!fs.existsSync(WRITEPATH)) {
      fs.mkdirSync(WRITEPATH);
    }
  }

  // check if file name is already exist or not
  if (fs.existsSync(WRITEPATH + fileName + "." + FILETYPE)) {
    console.log(
      log.red(METHOD.toLowerCase() + `: ${fileName} is already exist`)
    );
    return;
  }

  const CREATE = () => {
    fs.readFile(READPATH + READFILENAME, DECODETYPE, (err, data) => {
      if (err) console.log(log.red(err));
      else {
        fs.writeFile(`${WRITEPATH}${fileName}.${FILETYPE}`, data, err => {
          if (err) console.log(log.red(err));
          console.log(
            log.green(`${METHOD.toLowerCase()}: ${fileName} created`)
          );
        });
      }
    });
  };

  CREATE();
} catch (error) {
  console.log(error.message);
}
