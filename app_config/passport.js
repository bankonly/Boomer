const JwtStratey = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const { User, UserQB } = require("../apps/Models/User");
const CONSTANT = require("./constants");

const Res = require('../apps/Controllers/DefaultResponseController')

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONSTANT.PRIVATE_KEY,
  algorithms: [CONSTANT.JWT_ALGORITHMS]
};

const strategy = new JwtStratey(option, async (decoded, done) => {
  try {
    const userData = await User.findById(decoded.userId).select(
      "-password -__v"
    );
    if (userData == null) {
      return done("UnAthorize",false);
    }
    
    if (userData.loginCount !== decoded.loginTime) {
      return done("UnAthorize",false);
    }
    return done(null,userData);
  } catch (error) {
    console.log(error.message)
    return done("UnAthorize",false);
  }
});

module.exports = passport => {
  passport.use(strategy);
};
