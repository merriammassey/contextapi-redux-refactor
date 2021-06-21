import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  const [currentCategory, setCategory] = useState("");

  return (
    <div className="container">
      {/* manage current category state */}
      {/* set category call back functin passed to category menu as a prop */}
      <CategoryMenu setCategory={setCategory} />
      {/* pass state to product list component as prop and instruct which category's products should be retrieved using Apollo*/}
      <ProductList currentCategory={currentCategory} />
    </div>
  );
};

export default Home;
