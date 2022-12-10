import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
// dev-x1skkk6mvb8njnfy.us.auth0.com      //domain

// 1CUPeQxBZY0Zs80oLxsS07nYKvUA98CW      //client id
ReactDOM.render(
  <Auth0Provider
    // domain="dev-x1skkk6mvb8njnfy.us.auth0.com"
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    // clientId="1CUPeQxBZY0Zs80oLxsS07nYKvUA98CW"
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        {/* fileter provider using products that we get from products provider */}

        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
