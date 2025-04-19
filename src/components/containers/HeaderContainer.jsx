import React from "react";
import "./styles.css";

const HeaderContainer = ({ children }) => {
  return (
    <div className="customContainer bg-blue-400 text-white">{children}</div>
  );
};

export default HeaderContainer;
