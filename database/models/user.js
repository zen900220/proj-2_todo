import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const schema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [4, "Name should be atleast 4 characters!"],
    required: [true, "Please enter your username!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email!"],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minLength: [8, "Password must be atleast 8 characters long!"],
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpire: {
    type: Date,
    select: false,
  },
});

// Before saving hash password if it changed
schema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Validating entered password against existing hashed password
schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password.toString(), this.password.toString());
};

// Generating reset password credentials
schema.methods.createResetCredentials = async function () {
  // Generate a random byte string as token
  const token = crypto.randomBytes(20).toString("hex");
  // Hash said token and store the hash in the document
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  // Set a token expiry time
  this.resetPasswordExpire = new Date(
    Date.now() + process.env.RESET_TOKEN_EXPIRES_IN * 60 * 1000
  );
  await this.save();
  // Return the token to be sent to user
  return token;
};

// Resetting reset password credentials (in case any error occurs)
schema.methods.emptyResetCredentials = async function () {
  this.resetPasswordToken = undefined;
  this.resetPasswordExpire = undefined;
  await this.save();
};

// Finding user based on entered reset token
schema.query.findUserByResetToken = async function (token) {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return await this.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: new Date() },
  }).select("+password"); // The purpose of finding this user is to change his password. So password field needed
};

export const User = mongoose.models.User || mongoose.model("User", schema);
