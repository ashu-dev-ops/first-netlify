import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart"); //check if local storage has some data soterd wwith key name cart
  if (cart) {
    //if it has data store with a key name  then convert than json into js object
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    // or else return empty array
    return [];
  }
};

const initialState = {
  // cart: [],
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0, //money
  shipping_fee: 500,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (id, color, amount, product) => {
    console.log(id, color);
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, product },
    });
  };
  const removeItem = (id) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  };

  const toggleAmount = (id, value) => {
    console.log(id, value);
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: { id, value },
    });
  };

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, toggleAmount, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
