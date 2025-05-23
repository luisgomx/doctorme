import React from "react";
import "./styles.css";

const ContentContainer = ({ children }) => {
  return (
    <div className="content min-h-screen bg-white text-black pt-5 mb-20">
      {children}
    </div>
  );
};

export default ContentContainer;
