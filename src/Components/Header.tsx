import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <div id="header-div">
      <Link to="/">
        <img
          src="https://i.postimg.cc/NMxRsSNJ/quizkid-logo.png"
          alt="quizkid logo"
          id="header-logo"
        />
      </Link>
      <div id="header-button-div">
        <Link to="/">
          <button className="every-button green-button">Find Quiz</button>
        </Link>
        <Link to="/create">
          <button className="every-button red-button">Create Quiz</button>
        </Link>
      </div>
    </div>
  );
};
