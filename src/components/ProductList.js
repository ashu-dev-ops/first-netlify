import React from "react";
import { GiH2O } from "react-icons/gi";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products: products, grid_view } = useFilterContext();
  // <h1>hi</h1>;
  if (products.lenght < 1) return <h2>sorry no product </h2>;
  if (grid_view === false) return <ListView products={products} />;
  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
