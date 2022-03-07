import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  setCategory: (choice: string) => void;
}

export const Header: React.FC<Props> = ({ setCategory }) => {
  const categories: string[] = [
    "All",
    "Film/TV",
    "Geography",
    "History",
    "Languages",
    "Literature",
    "Maths",
    "Music",
    "Science",
    "Society",
    "Sport",
    "Other",
  ];
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div id="header-div">
      <div>
        <Link to="/">
          <img
            src="https://i.postimg.cc/NMxRsSNJ/quizkid-logo.png"
            alt="quizkid logo"
            id="header-logo"
          />
        </Link>
      </div>
      <div id="header-split-whole">
        <div className="header-split-half">
          {opened ? (
            <button
              id="main-category-button"
              className="every-header-button"
              onMouseEnter={() => setOpened(true)}
              onMouseLeave={() => setOpened(false)}
              onClick={() => {
                setOpened(opened ? false : true);
              }}
            >
              Categories
            </button>
          ) : null}
          {opened ? (
            <div
              onMouseEnter={() => setOpened(true)}
              onMouseLeave={() => setOpened(false)}
              id="categories-list-div"
            >
              {categories.map((category) => {
                return (
                  <Link to="/" key={`link-${category}`}>
                    <button
                      className="category-list-button every-header-button"
                      key={category}
                      onClick={() => {
                        setOpened(false);
                        setCategory(category);
                      }}
                    >
                      {category}
                    </button>
                  </Link>
                );
              })}
            </div>
          ) : (
            <button
              id="main-category-button"
              className="every-header-button"
              onMouseEnter={() => setOpened(true)}
              onClick={() => setOpened(true)}
            >
              Categories
            </button>
          )}
        </div>
        <div className="header-split-half">
          <Link className="header-links" to="/create">
            <button
              id="create-button"
              className="every-header-button"
              onClick={() => setOpened(false)}
            >
              Create Quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
