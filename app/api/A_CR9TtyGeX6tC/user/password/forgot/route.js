import { User } from "@/database/models/user";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { errorHandler } from "@/utils/errorHandler";
import { sendMail } from "@/utils/sendMail";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  let user;
  try {
    connectDb();
    const { email } = await req.json();

    user = await User.findOne({ email });

    if (!user)
      throw new CustomError(
        "Not Found",
        404,
        "User with given email doesn't exist!"
      );

    const token = await user.createResetCredentials();

    const url = `${req.nextUrl.protocol}//${req.nextUrl.host}/password/reset/${token}`;

    const message = `You recieved this message because you wanted to reset your Todolu password.\nIf it wasn't you
    then ignore this message.\n\n\nClick Here to Enter New Password: ${url}`;

    await sendMail(message, user.email);

    return NextResponse.json({
      success: true,
      message: `Password reset url sent to ${user.email}`,
    });
  } catch (error) {
    if (user) await user.emptyResetCredentials();
    return errorHandler(error);
  }
};
