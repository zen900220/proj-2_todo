import mongoose from "mongoose";

export const connectDb = async function () {
  const ready = mongoose.connection.readyState;
  if (ready === 1 || ready === 2) return;
  mongoose.set("strictQuery", false);
  const data = await mongoose.connect(process.env.DB_URL);
  console.log(`Connected to mongoose server at: ${data.connection.host}`);
};
