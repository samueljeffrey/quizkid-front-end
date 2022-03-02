import React from "react";

interface Props {
  setCategory: () => void;
}

export const Header: React.FC = () => {
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

  return (
    <div>
      <div>
        <img src="../../public/images/quizkid-logo.png" alt="quizkid logo" />
        <h1>Quizkid</h1>
        {categories.map((category) => {
          return <h3>{category}</h3>;
        })}
      </div>
    </div>
  );
};
