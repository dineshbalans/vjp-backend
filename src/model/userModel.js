import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
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
    select: false,
  },
  fName: {
    type: String,
  },
  lName: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("pswd")) {
    return next();
  }
  this.pswd = await bcrypt.hash(this.pswd, 10);
  next();
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.isValidPassword = async function (enteredPassword) {
  console.log(enteredPassword, this.pswd);
  return await bcrypt.compare(enteredPassword, this.pswd);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
