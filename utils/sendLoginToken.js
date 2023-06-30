import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// creating jwt token here itself instead of in a mongoose schema method bcos
// for some darn reason next doesnt like it and it doesnt work no matter what i try.

export const sendLoginToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: `${process.env.COOKIE_EXPIRES_IN}d`,
  });

  const expiresIn = new Date(
    Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  );

  const { username, email } = user;

  return NextResponse.json(
    {
      success: true,
      user: {
        username,
        email,
      },
    },
    {
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Expires=${expiresIn}`,
      },
    }
  );
};
