class ApiError extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this,this.constructor)
    }
    //static method is used here as no need to create a object everytmine using the methods wecan directly call it uisng ApiError class
    static badRequest(message="bad Request"){
        return new ApiError(400,message)
    }
    static unauthorised(message="unauthorised Request"){
        return new ApiError(401,message)
    }
    static conflict(message="alrady presnt"){
        return new ApiError(403,message)
    }
    static forbidden (message="not allowed"){
        return new ApiError(409,message)
    }
    static notfound (message="not found"){
        return new ApiError(409,message)
    }
}


export default ApiError
