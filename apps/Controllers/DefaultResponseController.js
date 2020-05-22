class SimpleResponseController {
  
	/**
  *
  *
  * @param {*} { data = {}, msg = 'duplicated', status = false, code = 409 }
  * @returns
  * @memberof SimpleResponseController
  */
	duplicated({ data = {}, msg = 'duplicated', status = false, code = 409 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'success', status = true, code = 200 }
 * @returns
 * @memberof SimpleResponseController
 */
	success({ data = {}, msg = 'success', status = true, code = 200 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'deleted success', status = true, code = 200 }
 * @returns
 * @memberof SimpleResponseController
 */
	deleted({ data = {}, msg = 'deleted success', status = true, code = 200 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'updated success', status = true, code = 200 }
 * @returns
 * @memberof SimpleResponseController
 */
	updated({ data = {}, msg = 'updated success', status = true, code = 200 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'created success', status = true, code = 200 }
 * @returns
 * @memberof SimpleResponseController
 */
	created({ data = {}, msg = 'created success', status = true, code = 200 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'something wrong', status = false, code = 500 }
 * @returns
 * @memberof SimpleResponseController
 */
	error({ data = {}, msg = 'something wrong', status = false, code = 500 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'badRequest', status = false, code = 400 }
 * @returns
 * @memberof SimpleResponseController
 */
	badRequest({ data = {}, msg = 'badRequest', status = false, code = 400 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}
	/**
 *
 *
 * @param {*} { data = {}, msg = "notFound", status = false, code = 404 }
 * @returns
 * @memberof SimpleResponseController
 */
	notFound({ data = {}, msg = 'notFound', status = false, code = 404 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}
	/**
 *
 *
 * @param {*} {
 *     data = {},
 *     msg = "unAuthorized",
 *     status = false,
 *     code = 419
 *   }
 * @returns
 * @memberof SimpleResponseController
 */
	unAuthorized({ data = {}, msg = 'unAuthorized', status = false, code = 419 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'notAllowed', status = false, code = 405 }
 * @returns
 * @memberof SimpleResponseController
 */
	notAllowed({ data = {}, msg = 'notAllowed', status = false, code = 405 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'success', status = true, code = 200 }
 * @returns
 * @memberof SimpleResponseController
 */
	outPut({ data = {}, msg = 'success', status = true, code = 200 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}

	/**
 *
 *
 * @param {*} { data = {}, msg = 'something wrong', status = false, code = 500 }
 * @returns
 * @memberof SimpleResponseController
 */
	somethingWrong({ data = {}, msg = 'something wrong', status = false, code = 500 }) {
		return {
			msg: msg,
			status: status,
			code: code,
			data: data
		};
	}
}

module.exports = new SimpleResponseController();
