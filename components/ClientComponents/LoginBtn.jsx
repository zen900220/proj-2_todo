import Link from "next/link";
import React from "react";

function Login() {
  let loginStatus = false;

  return (
    <>
      {loginStatus ? <button>Logout</button> : <Link href="/login">Login</Link>}
    </>
  );
}

export default Login;
