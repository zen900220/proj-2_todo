import React from "react";
import "./Header.scss";
import Link from "next/link";
import LoginBtn from "../ClientComponents/LoginBtn";

const Header = () => {
  return (
    <div className="header">
      <main>
        <h1>ToDoLu</h1>
        {/* <span>The cooler way of organising life.</span> */}
      </main>
      <input type="checkbox" />
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <LoginBtn />
      </nav>
    </div>
  );
};

export default Header;
