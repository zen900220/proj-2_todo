import { cookies } from "next/dist/client/components/headers";
import jwt from "jsonwebtoken";
import { User } from "@/database/models/user";

export async function authenticate() {
  const info = { success: false, user: undefined };

  try {
    const { value } = cookies().get("token");

    // No cookie with name token
    if (!value) return info;

    // An err here means value has been modified or tampered with
    const { id } = jwt.verify(value, process.env.JWT_SECRET_KEY);

    const user = await User.findById(id);

    // User with given id doesn't exist
    if (!user) return info;

    info.success = true;
    info.user = user;

    return info;
  } catch (error) {
    return info;
  }
}
