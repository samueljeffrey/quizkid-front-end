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
        <img src="../../public/images/quizkid-logo.png" alt="quizkid logo" />
        <h1>Quizkid</h1>
        {opened ? (
          categories.map((category) => {
            return (
              <Link
                className=""
                to="/"
                key={category}
                onClick={() => {
                  setOpened(false);
                  console.log(`just before ${category} set`);
                  setCategory(category);
                }}
              >
                {category}
              </Link>
            );
          })
        ) : (
          <button onClick={() => setOpened(true)}>Categories</button>
        )}
      </div>
    </div>
  );
};
