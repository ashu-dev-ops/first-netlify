import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [], //we will change this
  all_products: [], //this will remian unchanged
  grid_view: true,
  list_view: false,
  sort: "price-lowest",
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();
  useEffect(
    () => {
      dispatch({
        type: LOAD_PRODUCTS,
        payload: products,
      });
    },
    // since initially products going to be undefine even in product context
    [products]
  );
  const setGridView = () => {
    dispatch({
      type: SET_GRIDVIEW,
    });
  };
  const setListView = () => {
    dispatch({
      type: SET_LISTVIEW,

      // type: SET_GRIDVIEW,
    });
  };
  const updateSort = (e) => {
    console.log(e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    
  };

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView }}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
