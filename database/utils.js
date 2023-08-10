import { CustomError } from "@/utils/CustomError";
import mongoose from "mongoose";

export const connectDb = async function () {
  // check if env vars re working
  if (!process.env.DB_URL) {
    throw new CustomError(
      "Server Error",
      500,
      "Can't connect to url: undefined"
    );
  }

  // check if a connection is already connected(1) or connecting(2)
  const ready = mongoose.connection.readyState;
  if (ready === 1 || ready === 2) return;

  mongoose.set("strictQuery", false);
  const data = await mongoose.connect(process.env.DB_URL);
  console.log(`Connected to mongoose server at: ${data.connection.host}`);
};
