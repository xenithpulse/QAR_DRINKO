

import catchAsyncFuncError from "../utils/catchAsyncFuntionErrors.js";
import { ErrorHandler } from "../utils/Errorhandler.js";
import jwt from "jsonwebtoken"
import Admin from "../models/adminModel.js";

export const isAuthenticatedAdmin = catchAsyncFuncError(async (req, res, next) => {
    
    const { token } = req.cookies;
    

    if (!token) {
        return next(new ErrorHandler("Please Login to access this sourse", 401))
    }

    const decodedDataID = jwt.verify(token, process.env.JWT_SECRET);   // as we created jwt by id in model of user , and store it in cookie when user login or register so that when we access this token we will find the id on which we jwt.sign

    try{

        req.admin = await Admin.findById(decodedDataID.id)
    }
    catch(err){
        next(new ErrorHandler("User Not Exists , As per in ccokies chnaged"),401)
        // ***************** remove the cookie info from message *************
    }

    next()

})