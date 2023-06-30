import { NextResponse } from "next/server";

export const errorHandler = (error) => {
  let {
    name = "Error",
    message = "Something went wrong",
    status = 500,
  } = error;

  if (error.code === 11000) {
    name = "Duplicate data error!";
    message = `The provided ${Object.keys(error.keyPattern).join(
      ","
    )} already exists!`;
    status = 400;
  }

  return NextResponse.json(
    { name, message, error },
    {
      status: status,
    }
  );
};
