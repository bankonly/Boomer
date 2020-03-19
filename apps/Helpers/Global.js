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

module.exports = {
  isFloat,
  isInt
};
