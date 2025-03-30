import React from "react";
import Navbar from "../components/common/navbar/navbar";
import Banner from "../components/core/banner";
import Categories from "./categories";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Categories />
    </>
  );
};

export default Home;
