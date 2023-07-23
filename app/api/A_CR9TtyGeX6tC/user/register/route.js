import { User } from "@/database/models/user";
import { connectDb } from "@/database/utils";
import { sendLoginToken } from "@/utils/sendLoginToken";
import { errorHandler } from "@/utils/errorHandler";
import { CustomError } from "@/utils/CustomError";

export async function POST(request) {
  let user;
  try {
    // connect to db
    await connectDb();

    // req.json() gives the body of the request
    const data = await request.json();

    const { username, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new CustomError(
        "Validation Error",
        400,
        "Password and confirm password don't match"
      );
    }

    // create user document
    user = await User.create({ username, email, password });

    // function to generate and send cookie along with normal response info
    return sendLoginToken(user);
  } catch (error) {
    // if something goes wrong delete the document IF it got created
    if (user) await User.findByIdAndDelete(user._id);
    return errorHandler(error);
  }
}
