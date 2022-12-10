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
  sort: "price-lowest", //it needs to match one of the options in sort seclect tag
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
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

  useEffect(() => {
    dispatch({
      type: SORT_PRODUCTS,
    });
    // products=>initial mount eg lowest-highest
    // state.sort=>when we change sort value
  }, [products, state.sort]);

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
    // linking our value of sort/select tag with the state
    const name = e.target.name;
    const value = e.target.value; //value inside our oprtion tag inside select tag
    console.log(`value is ${value}`);
    dispatch({
      type: UPDATE_SORT,
      payload: value,
    });
  };
  //
  const updateFilters = (e) => {
    // linking filter inputs with state so any change in filter will fire this dispatch and our use effect of filter products
    let name = e.target.name;
    let value = e.target.value;
    // if (name === 'category') {
    // we access an value inside any tag but button by default have value attribute
    //   value = e.target.textContent
    // }

    // using data attribute
    // first we check name then change the value according the data attribute we get
    // if (name === "color") {
    //   value = e.target.dataset.color;
    // }
    if (name === "price") {
      // by deafult range input string
      value = Number(e.target.value);
    }

    if (name === "shipping") {
      // access check box values
      value = e.target.checked;
    }
    console.log(name, value);
    dispatch({
      type: UPDATE_FILTERS,
      payload: { name, value },
    });
    // console.log(state.filters.color);
  };

  //running use effect to run the logic when your hooked state values change their values
  useEffect(
    () => {
      dispatch({
        type: FILTER_PRODUCTS,
        // updating list
      });
      dispatch({
        type: SORT_PRODUCTS,
        // updating list
      });
      // after every filter we also have sort that list according to selected sort value
      // dispatch({
      //   type: UPDATE_SORT,

      //   // sorting updated list
      // });
    },
    // fire this on initial mount
    // any change happen in filters object
    // if value of sort changes
    [products, state.filters, state.sort]
  );
  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
    });
  };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
