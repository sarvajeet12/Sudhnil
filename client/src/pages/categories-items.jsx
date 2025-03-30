import React from "react";
import "../components/core/style/categories.css";
import categoriesItemsData from "../data/categories-item-data";

const CategoriesItems = () => {
  return (
    <div className="categoriesItems">
      {categoriesItemsData.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.image} alt="" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h1>Rs {item.price}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesItems;
