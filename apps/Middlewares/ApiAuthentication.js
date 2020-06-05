const {UserQB,User} =require('../Models/User')
const Res = require('../Controllers/ResponseController')
const Helper = require('../Helpers/Global')
const Jwt = require('jsonwebtoken')
const CONSTANT = require('../../app_config/constants')

module.exports = async (req,res,next) => {
    try {
        const authorization = req.headers.authorization
        if(!authorization){
            return Res(res).unAuthorized({})
        }

        const decoded = Jwt.verify(authorization,process.env.SECRET_KEY)
        const userData = await User.findById(decoded.userId).select('-password -__v')
        if(userData == null){
            return Res(res).unAuthorized({msg:"user might be deleted or banned"})
        }

        if(userData.loginCount !== decoded.loginTime){
            return Res(res).unAuthorized({})
        }
        req.auth = userData
        return next();
    } catch (error) {
        return Res(res).unAuthorized({})
    }
}
