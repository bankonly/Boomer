class LogController{

    success(data={},msg="success",status=true,code=200){
        return console.log({message:msg,status:status,code:code,data:data})
    }

    // deleted
    deleted(data={},msg="deleted success",status=true,code=200){
        return console.log({message: data + ' '+ msg,status:status,code:code,data:data})
    }

    // updated
    updated(data={},msg="updated success",status=true,code=200){
        return console.log({message: data + ' '+ msg,status:status,code:code,data:data})
    }

    // created
    created(data={},msg="created success",status=true,code=200){
        return console.log({message: data + ' '+ msg,status:status,code:code,data:data})
    }

    // error
    error(data={},msg="error",status=false,code=500){
        return console.log({message:msg,status:status,code:code,data:data})
    }

    // badRequest
    badRequest(data={},msg="badRequest",status=false,code=400){
        return console.log({message:msg,status:status,code:code,data:data})
    }

    // notFound
    notFound(data={},msg="notFound",status=false,code=404){
        return console.log({message:msg,status:status,code:code,data:data})
    }

    // unAuthorized
    unAuthorized(data={},msg="unAuthorized",status=false,code=419){
        return console.log({message:msg,status:status,code:code,data:data})
    }

    // notAllowed
    notAllowed(data={},msg="notAllowed",status=false,code=405){
        return console.log({message:msg,status:status,code:code,data:data})
    }

    // outPut
    outPut(data={},msg="success",status=true,code=200){
        return console.log({message:msg,status:status,code:code,data:data})
    }
}

module.exports = new LogController()