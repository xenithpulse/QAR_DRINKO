import catchAsyncFuncError from "../utils/catchAsyncFuntionErrors.js";
import { ErrorHandler } from "../utils/Errorhandler.js";
import Admin from "../models/adminModel.js";
import { sendToken } from "../helpers/setJwtToken.js";

export const registerAdmin = catchAsyncFuncError(async (req, res) => {
  const { username, password } = req.body;

  const admin = new Admin({
    username,
    password,
  });

  await admin.save({ validateBeforeSave: true });
  sendToken(admin, 201, res);
});

export const loginAdmin = catchAsyncFuncError(async (req, res,next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please Enter Email & password both")), 400;
  }

  const admin = await Admin.findOne({ username }).select("+password");

  if (!admin) {
    return next(new ErrorHandler("Invalid Email or Password"), 401); // 401 = unauthorized
  }

  const isPasswordMatched = await admin.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password"), 401); // 401 = unauthorized
  }

  sendToken(admin, 200, res);
});


export const getAdmins = catchAsyncFuncError(async (req, res) => {
    
    const admins = await Admin.find();


    res.status(200).json({
        success:true,
        admins
    })
  });



  export const removeAdmin = catchAsyncFuncError(async (req, res,next) => {
    
    const {id} = req.params;
    if(id == req.admin.id){
      return next(new ErrorHandler("You can not remove yourself")), 400;

    }
    
    const admin = await Admin.findByIdAndDelete(id);


    res.status(200).json({
        success:true,
        admin
    })
  });


  
  
export const logoutAdmin = catchAsyncFuncError(async (req, res,next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
      });
  });
  
  export const getAdminDetails = catchAsyncFuncError(async (req,res)=>{
    
    const admin = await Admin.findById(req.admin.id);

    
    res.status(200).json({
      success: true,
      admin,
    });
  })