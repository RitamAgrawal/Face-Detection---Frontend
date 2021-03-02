import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import logo from "./AI.png";
const Logo = () => {
  return (
    <div className="pa1">
      <Tilt
        className="Tilt br2 pa-3 shadow-2"
        options={{ max: 45 }}
        style={{ height: 175, width: 175 }}
      >
        <div className="Tilt-inner shadow-2">
          <img className="rotate" alt="logo" src={logo} />
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
