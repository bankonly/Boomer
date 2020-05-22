const { UserClass, User } = require('../Models/User');
const Res = require('../Controllers/DefaultResponseController');
const Bcrypt = require('../Helpers/Bcrypt');
const Jwt = require('../Helpers/Jwt');

class UserProvider {
	validateResgisterObj(registerData) {
		if (!registerData.phoneNumber) return Res.badRequest({ msg: 'phoneNumber is requried' });
		if (!registerData.password) return Res.badRequest({ msg: 'password is requried' });
		if (!registerData.confirmPassword) return Res.badRequest({ msg: 'confirmPassword is requried' });
		if (registerData.password !== registerData.confirmPassword)
			return Res.badRequest({ msg: 'Password is not matched' });
		return Res.success({});
	}

	/**
 *
 *
 * @param {*} { phoneNumber, password, confirmPassword }
 * @returns
 * @memberof UserProvider
 */
	async register({ phoneNumber, password, confirmPassword }) {
		try {
			const isPhoneNumber = await UserClass.findByPhoneNumber(phoneNumber);

			// Check if PhoneNumber is already exist in database
			if (isPhoneNumber !== null) {
				return Res.duplicated({ data: phoneNumber });
			}

			const hashPwd = await Bcrypt.hashPassword(password);
			if (!hashPwd) return Res.error({});

			const insertData = {
				phoneNumber: phoneNumber,
				password: hashPwd
			};
			const createUser = await User.create(insertData);
			if (createUser) {
				const token = Jwt.jwtMethod(UserClass.tokenObject(createUser));

				return Res.success({
					msg: 'Register Success',
					data: {
						token: token
					}
				});
			}
			return Res.error({});
		} catch (error) {
			console.log(error.message);
			return Res.somethingWrong({});
		}
	}

	validateUpdateObj(updateObject) {
		if (!updateObject.email) {
			return Res.badRequest({
				msg: 'Email is requried'
			});
		}
		if (!updateObject.identityCard) {
			return Res.badRequest({
				msg: 'IdentityCard is requried'
			});
		}
		return Res.success({});
	}

	async update(req) {
		var body = req.body;
		var auth = req.auth;

		try {
			const isValidate = this.validateUpdateObj(body);
			if (isValidate.code !== 200) return isValidate;

			const isUser = await UserClass.findByUserId(auth.userId);
			if (isUser == null) return Res.notFound({});

			const isEmail = await UserClass.findByEmail(body.email);
			if (isEmail !== null && isUser.email !== body.email) {
				return Res.duplicated({});
			}

			if (isUser.update(body)) {
				const response = UserClass.removeObjecj(isUser.dataValues);
				return Res.success({ data: response });
			}
			return Res.outPut({ msg: 'nothing update' });
		} catch (error) {
			console.log(error.message);
			return Res.somethingWrong({});
		}
	}

	validateLoginObj(loginObject) {
		if (!loginObject.phoneNumber) {
			return Res.badRequest({
				msg: 'phoneNumber is requried'
			});
		}
		if (!loginObject.password) {
			return Res.badRequest({
				msg: 'password is requried'
			});
		}
		return Res.success({});
	}

	async getAuth({ userId }) {
		const userData = await UserClass.findByUserId(userId);
		if (userData == null) return Res.notFound({});
		const response = UserClass.removeObjecj(userData.dataValues);
		return Res.success({ data: response });
	}

	async login({ phoneNumber, password }) {
		try {
			const isPhoneNumber = await UserClass.findByPhoneNumber(phoneNumber);
			if (isPhoneNumber == null) {
				return Res.notFound({
					data: phoneNumber,
					msg: 'Phonenumber notfound'
				});
			}

			const isPwdVerify = await Bcrypt.verifyPassword(password, isPhoneNumber.password);

			if (!isPwdVerify) return Res.badRequest({ msg: 'Incorrect Password' });

			const tokenObj = UserClass.tokenObject(isPhoneNumber.dataValues);
			const token = Jwt.jwtMethod(tokenObj);

			return Res.success({ data: { token: token }, msg: 'Login Success' });
		} catch (error) {
			console.log(error.message);
			return Res.somethingWrong({});
		}
	}
}

module.exports = new UserProvider();
