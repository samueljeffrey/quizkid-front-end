import React from "react";
import { Link } from "react-router-dom";

interface Props {
  setCategory: (category: string) => void;
}

export const Header: React.FC<Props> = ({ setCategory }) => {
  // const [opened, setOpened] = useState<boolean>(false);

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
        {/* {opened ? (
            <button
              id="main-category-button"
              className="every-button"
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
            <select
              onMouseEnter={() => setOpened(true)}
              onMouseLeave={() => setOpened(false)}
              id="categories-list"
            >
              {categories.map((category) => {
                return (
                  <Link to="/" key={`link-${category}`}>
                    <option
                      className="category-list-button every-button"
                      key={category}
                      onClick={() => {
                        setOpened(false);
                        setCategory(category);
                      }}
                    >
                      {category}
                    </option>
                  </Link>
                );
              })}
            </select>
          ) : (
            <button
              id="main-category-button"
              className="every-button"
              onMouseEnter={() => setOpened(true)}
              onClick={() => setOpened(true)}
            >
              Categories
            </button>
          )} */}
        <Link to="/create">
          <button id="create-button" className="every-button">
            Create Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};
