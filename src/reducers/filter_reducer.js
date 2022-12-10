import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // create a new array that only contain the price from array of products
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      // copying value
      filtered_products: [...action.payload],
      all_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    console.log(action.payload);
    return {
      ...state,
      sort: action.payload,
    };
    
  }
  // if (action.type === UPDATE_SORT) {
  //   return { ...state, sort: action.payload };
  //   console.log(state.sort);
  // }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    // price accending order arrange 5,10
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    // price deccending order arrange 10,5
    if (sort === "price-heighest") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    // if (sort === "name-a") {
    //   tempProducts = tempProducts.sort((a, b) => {
    //     return a.name.localeCompare(b.name);
    //   });
    // }
    // if (sort === "name-z") {
    //   tempProducts = tempProducts.sort((a, b) => {
    //     return b.name.localeCompare(a.name);
    //   });
    // }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      // linking input value with the state=>contolled input
      filters: { ...state.filters, [name]: value },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    // return { ...state };
    const { all_products } = state;
    let tempProducts = [...all_products];
    // console.log(tempProducts.colors);
    const {
      text,
      company,
      category,
      color,
      // min_price: 0,
      // max_price: 0,
      price,
      shipping,
    } = state.filters;

    if (text) {
      tempProducts = tempProducts.filter((p) => {
        console.log(tempProducts);
        return p.name.toLowerCase().includes(text);
      });
    }

    if (company !== "all") {
      tempProducts = tempProducts.filter((p) => {
        return p.company === company; //company if filters obj
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((p) => {
        return p.category === category;
      });
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((p) => {
        return p.colors.find((c) => c === color);
      });
    }

    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        // console.log(product.shipping);
        return product.shipping === true;
      });
    }
    // console.log(tempProducts);

    tempProducts = tempProducts.filter((product) => product.price <= price);

    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters, //carry on min and max price values beacuse we load them while firing useEffect in the beginning
        text: "",
        company: "all",
        category: "all",
        color: "all",
        // min_price: 0,
        // max_price: 0,
        // price: 0,want to be equal to max price
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
