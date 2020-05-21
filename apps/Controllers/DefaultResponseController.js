class SimpleResponseController {
  duplicated({ data = {}, msg = "duplicated", status = false, code = 409 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  success({ data = {}, msg = "success", status = true, code = 200 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  deleted({ data = {}, msg = "deleted success", status = true, code = 200 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  updated({ data = {}, msg = "updated success", status = true, code = 200 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  created({ data = {}, msg = "created success", status = true, code = 200 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  error({ data = {}, msg = "something wrong", status = false, code = 500 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  badRequest({ data = {}, msg = "badRequest", status = false, code = 400 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  notFound({ data = {}, msg = "notFound", status = false, code = 404 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  unAuthorized({
    data = {},
    msg = "unAuthorized",
    status = false,
    code = 419
  }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  notAllowed({ data = {}, msg = "notAllowed", status = false, code = 405 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  outPut({ data = {}, msg = "success", status = true, code = 200 }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }

  somethingWrong({
    data = {},
    msg = "something wrong",
    status = false,
    code = 500
  }) {
    return {
      msg: msg,
      status: status,
      code: code,
      data: data
    };
  }
}

module.exports = new SimpleResponseController();
