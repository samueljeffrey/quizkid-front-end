import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  setCategory: (choice: string) => void;
}

export const Header: React.FC<Props> = ({ setCategory }) => {
  const categories: string[] = [
    "All",
    "Film & TV",
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
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <div>
        <img
          src="https://i.postimg.cc/NMxRsSNJ/quizkid-logo.png"
          alt="quizkid logo"
        />
        <Link to="/">
          <h1>Quizkid</h1>
        </Link>
      </div>
      {opened ? (
        categories.map((category) => {
          return (
            <Link to="/" key={`link-${category}`}>
              <button
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
        })
      ) : (
        <button onClick={() => setOpened(true)}>Categories</button>
      )}
      {opened ? <button onClick={() => setOpened(false)}>Close</button> : null}
      <Link to="/create">
        <button onClick={() => setOpened(false)}>Create</button>
      </Link>
    </div>
  );
};
