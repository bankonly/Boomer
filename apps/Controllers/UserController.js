const Controller = require("./Controller");
const CONSTANT = require("../../app_config/constants");
const { log } = require("../Providers/ActivityLogProvider");
const UserProvider = require('../Providers/UserProvider')
const {User,UserQB} = require('../Models/User')

class UserController extends Controller {

  async get() {
    try {
      const userData = await UserProvider.getAllUser()
      this.response(userData);
    } catch (err) {
      this.responseError({ error:error });
    }
  }

  async login() {
    try {
      const loginInput = {
        author:this.body.author,
        password:this.body.password
      }

      // validate login data
      const isValidate = UserProvider.validateLoginObj(loginInput)
      if(isValidate.code !== 200) return this.response(isValidate)

      const loginData = await UserProvider.login(loginInput)
      this.response(loginData);
    } catch (err) {
      this.responseError({ error:error });
    }
  }


  // create new user
  async register() {
    try {
      // preapre save data
      const data = {
        phoneNumber:this.body.phoneNumber,
        password:this.body.password,
        confirmPassword:this.body.confirmPassword,
        mail:this.body.mail,
      }

      // validate
      const isValidate = UserProvider.validateRegisterObj(data)
      if(isValidate.code !== 200) return this.response(isValidate)

      const newUser = await UserProvider.register(data)
      return this.response(newUser)
    } catch (err) {
      this.responseError({ error:error });
    }
  }


  // get user by id
  async getWithParam() {
    try {
      const userData = await UserProvider.getUser(this.params.userId)
      this.response(userData);
    } catch (err) {
      this.responseError({ error:error });
    }
  }


  // update user
  async update() {
    try {
       // preapre save data
       const data = {
        phoneNumber:this.body.phoneNumber,
        mail:this.body.mail,
        name:this.body.name,
        age:this.body.age,
        userId:this.params.userId
      }

      // validate
      const isValidate = UserProvider.validateUpdateObj(data)
      if(isValidate.code !== 200) return this.response(isValidate)

      const newUser = await UserProvider.update(data)
      return this.response(newUser)
    } catch (err) {
      this.responseError({ error:error });
    }
  }


  // delete user by userId
  async delete() {
    try {
      const del = await UserProvider.delete(this.params.userId) 
      this.response(del);
    } catch (err) {
      this.responseError({ error:error });
    }
  }

  // whoami
  async whoami(){
    try {
      this.response({data:this.req.user})
    } catch (error) {
      this.responseError({ error:error });
      
    }
  }
}

module.exports = (...args) => new UserController(...args);
