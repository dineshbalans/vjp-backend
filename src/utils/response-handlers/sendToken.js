// sendToken.js
export const sendToken =async (res, user, message, statusCode) => {
  
  const token =await user.getJwtToken();

  console.log(token,'send token');

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(200).cookie("token", token, options).json({
      success: true,
      statusCode: statusCode,
      token,
      message: message,
      user,
    });
  };
  
  export default sendToken;
  