export const sendToken = (admin, statusCode, res) => {
    const token = admin.getJWTToken()

    const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true,  // Means this cookie will accessable by only http requests
       
    }


    
    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        admin,
        token,
    })

}