// check if is float or not return boolean
function isFloat(floatNumber) {
  const isFloatType = isNaN(parseFloat(floatNumber));
  if (isFloatType) return false;
  return true;
}

function isInt(intNumber) {
  const isIntType = isNaN(parseInt(intNumber));
  if (isIntType) return false;
  return true;
}

const use = (pathToFileName) => {
  return {
    formController: () => require("../Controllers/" + pathToFileName),
    formMiddleware: () => require("../Middlewares/" + pathToFileName),
    formModel: () => require("../Models/" + pathToFileName),
    formProvider: () => require("../Providers/" + pathToFileName),
  };
};

module.exports = {
  isFloat,
  isInt,
  use,
};
