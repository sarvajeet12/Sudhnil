import React from "react";
import "../components/core/style/categories.css";
import categoriesData from "../data/categories-data";
import CategoriesItems from "./categories-items";

const Categories = () => {
  return (
    <section className="categories">
      <h1>Categories</h1>
      <ul className="categoriesList">
        {categoriesData.map((categories, index) => {
          return (
            <li key={index}>
              <img src={categories.image} alt={categories.image} />
              <h2>{categories.categoryName}</h2>
            </li>
          );
        })}
      </ul>

      {/* categories items */}
      <CategoriesItems />
    </section>
  );
};

export default Categories;
