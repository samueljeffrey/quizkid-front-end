import React from "react";
import { Link } from "react-router-dom";

interface Props {
  setCategory: (category: string) => void;
}

export const Header: React.FC<Props> = ({ setCategory }) => {
  return (
    <div id="header-div">
      <div>
        <Link to="/">
          <img
            onClick={() => setCategory("All")}
            src="https://i.postimg.cc/NMxRsSNJ/quizkid-logo.png"
            alt="quizkid logo"
            id="header-logo"
          />
        </Link>
      </div>
      <div id="header-button-div">
        <Link to="/">
          <button
            id="find-button"
            className="every-button"
            onClick={() => setCategory("All")}
          >
            Find Quiz
          </button>
        </Link>
        <Link to="/create">
          <button id="create-button" className="every-button">
            Create Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};
