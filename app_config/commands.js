const fs = require("fs");

// Create Json Data Controller Name
const addPropertyToNpmCommand = ({
  path = "./app_config/npm_command.json",
  propertyName = null,
  method = null
}) => {
  if (propertyName == null) {
    console.log("propertyName can not be null");
    return;
  }
  fs.readFile(path, "utf8", (err, data) => {
    const object = JSON.parse(data);

    if (method == "controllers") {
      object.controllers.push(propertyName); // Add Controller name
    } else if (method == "providers") {
      object.providers.push(propertyName); // Add Controller name
    } else if (method == "models") {
      object.models.push(propertyName); // Add Controller name
    } else if (method == "resources") {
      object.resources.push(propertyName); // Add Controller name
    } else if (method == "middlewares") {
      object.middlewares.push(propertyName); // Add Controller name
    } else if (method == "commands") {
      object.commands.push(propertyName); // Add Controller name
    }

    fs.writeFile(path, JSON.stringify(object), "utf8", err => {
      if (err) console.log(err);
      else console.log(`${propertyName} Added`);
    });
    return;
  });
};

function readJsonCmd(callback) {
  fs.readFile("./app_config/npm_command.json", "utf8", callback);
}

module.exports = {
  addPropertyToNpmCommand,
  readJsonCmd
};
