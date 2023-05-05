import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about">
      <div className="text">
        <div className="line">
          <div className="word">I</div>
          <div className="word">AM A</div>
        </div>
        <div className="line">
          <div className="word">WEB</div>
          <div className="word">DEVELOPER</div>
        </div>
        <div className="line">
          <div className="word">CHECK OUT</div>
          <div className="word">MY</div>
        </div>
        <div className="line">
          <div className="word fancy">
            <a href="https://www.github.com/zen900220" target="_blank">
              <span>P</span>
              <span>R</span>
              <span>O</span>
              <span>J</span>
              <span>E</span>
              <span>C</span>
              <span>T</span>
              <span>S</span>
            </a>
          </div>
          <div className="word">OR</div>
        </div>
        <div className="line">
          <div className="word">MAIL ME</div>
          <div className="word fancy">
            <a href="mailto:pratim292@gmail.com" target="_blank">
              <span>H</span>
              <span>E</span>
              <span>R</span>
              <span>E</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
