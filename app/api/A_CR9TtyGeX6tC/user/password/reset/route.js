import { User } from "@/database/models/user";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDb();

    const { token, newPassword, confirmPassword } = await req.json();

    // find user with provided reset token
    const user = await User.find().findUserByResetToken(token);

    if (!user) {
      throw new CustomError("Validation Error", 404, "Invalid Token");
    }

    // if reset token is valid check if password and confirm password are equal
    if (newPassword !== confirmPassword) {
      throw new CustomError(
        "Validation Error",
        400,
        "New password and confirm password don't match"
      );
    }

    user.password = newPassword;

    await user.emptyResetCredentials();
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Reset password successful! Please login with new password.",
    });
  } catch (error) {
    return errorHandler(error);
  }
};
