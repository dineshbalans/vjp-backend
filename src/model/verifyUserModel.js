import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import bcrypt from "bcryptjs";

const passwordValidator = (value) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
  return passwordRegex.test(value);
};

const verifyUserSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  pswd: {
    type: String,
    required: true,
    validate: {
      validator: passwordValidator,
      message:
        "Password must be 8 to 12 characters with at least one number and one special character (!@#$%^&*)",
    },
  },
  gstNum: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  cmpny: {
    type: String,
  },
  strtAddrss: {
    type: String,
  },
  cntry: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  phNum: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  token: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VerifyUser = mongoose.model("VerifyUser", verifyUserSchema);
export default VerifyUser;
