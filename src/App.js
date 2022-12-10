import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  About,
  AuthWrapper,
  // AboutPage,
  Cart,
  Checkout,
  Error,
  Home,
  PrivateRoute,
  Products,
  SingleProduct,
} from "./pages";
// import SingleProductPage from "./pages/SingleProductPage";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        {/* <Switch> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        {/* </Switch> */}
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
{
  /* <Route exact path="/">
<Home />
</Route>
<Route path="/about">
<About />
</Route>
<Route path="/cart">
<Cart />
</Route>
<Route exact path="/products">
<Products />
</Route>
<Route exact path="/products/:id">
<SingleProduct />
</Route>
{/* <Route exact path="/checkout">
<Checkout />
</Route> */
}

{
  /* <PrivateRoute exact path="/checkout">
<Checkout />
</PrivateRoute>
{/* <Route exact path="/products/:id" children={<SingleProduct />} /> */
}
{
  /* <Route path="*">
<Error />
</Route> */
}
