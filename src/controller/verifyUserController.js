import { add as addUser } from "../service/userService.js";
import {
  add,
  removeVerifyUser,
  verifyUserCheck,
  verifyUserToken,
} from "../service/verifyUserService.js";
import { BADREQUEST, SUCCESS } from "../utils/constants/statusCode.js";
 import sendEmail from "../utils/mail/sendEmail.js";
import { verifyedSuccess } from "../utils/mail/verifyTemplates.js";
import AppError from "../utils/response-handlers/app-error.js";
import AppSuccess from "../utils/response-handlers/app-success.js";
import { validateVerifyUser } from "../utils/validator/validateVerifyUser.js";
import jwt from "jsonwebtoken";

function generateToken(email) {
  const token = jwt.sign({ email }, process.env.SIGNUP_SECRET_TOKEN, {
    expiresIn: "1h",
  });
  return token;
}

export const verifyUser = async (req, res, next) => {
  try {
    

    // Validate the request body
    const { error } = validateVerifyUser.validate(req.body);

    if (error) {
      console.log("Invalid request: " + error.message);
      return next(new AppError("Invalid request data", BADREQUEST));
    }

    const { email } = req.body;

    // Check if the user already exists
    console.log('email',email)
    const alreadyExists = await verifyUserCheck(email);
    console.log(alreadyExists,'alreadyExists')

  
    if (alreadyExists) {
      return next(new AppError("User already exists", BADREQUEST));
    }

    // Generate a token for the user
    const token = generateToken(email);
    req.body.token = token;

    // Save the new user data
    const newUser = await add(req.body);

    console.log(newUser)
 
    // Construct the activation link
    const BASE_URL = `${req.protocol}://${req.get("host")}`;
    const activationLink = `${BASE_URL}/api/v1/verify/${token}`;
   
    // Send the verification email
    await sendEmail({
      email: email,
      subject: "VJP Email Verification Request",
      html: `Activate Link - ${activationLink}`,
    });
    console.log("Verification email sent to:", email);

    return next(
      new AppSuccess(
        "verfication sent",
        "Email verification successfully sent",
        SUCCESS
      )
    );
  } catch (err) {
    console.error("Error during user verification:", err);
    return next(new AppError(err.message || "An error occurred", BADREQUEST));
  }
};

export const InsertUser = async (req, res, next) => {
  try {
    const response = await InsertUsertoUser(req.params.token, req, res, next);

    if(response){
      return verifyedSuccess()
    }
    return next(new AppSuccess(response, "User successfully sent", SUCCESS));
  } catch (err) {
    return next(new AppError(err.message, BADREQUEST));
  }
};

const InsertUsertoUser = async (token, req, res, next) => {
  try {
    const verifyUser = await verifyUserToken(token);
    if (!verifyUser) {
      return next(new AppError("Token expired or invalid", BADREQUEST));
    }

    console.log("Verified user:", verifyUser);

    console.log("pass", verifyUser);
    const user = await addUser({
      email: verifyUser.email,
      pswd: verifyUser.pswd,
      fName: verifyUser.fName,
      lName: verifyUser.lName,
      gstNum: verifyUser.gstNum,
      cmpny: verifyUser.cmpny,
      strtAddrss: verifyUser.strtAddrss,
      cntry: verifyUser.cntry,
      state: verifyUser.state,
      city: verifyUser.city,
      zipCode: verifyUser.zipCode,
      phNum: verifyUser.phNum,
    });

    console.log("New user added:", user);

    const BASE_URL = `${req.protocol}://${req.get("host")}`;
    const activationLink = `${BASE_URL}/api/v1/activate/${token}`;
    await sendEmail({
      email: verifyUser.email,
      subject: "VJP Account Verification Success",
      html: `
        <h2>Account Verification Successful</h2>
        <p>Thank you for verifying your account. Your account has been verified.</p>
        <p>Please click the link below to activate your account:</p>
        
      `,
    });

    await removeVerifyUser(token);

    return `<h1>User ${user.email} successfully sent</h1>`;
  } catch (err) {
    return next(new AppError(err.message, BADREQUEST));
  }
};
