import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    // imp destructuring filters obj
    filters: {
      text,
      company,
      price,
      min_price,
      max_price,
      category,
      color,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products, //from state in filter context
  } = useFilterContext();
  // console.log(all_products);
  // we will map over them to produceui ele
  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");
  // console.log(categories);
  // console.log(colors);
  // console.log(companies);

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text" //we will access this value inside our context using name attribute
              className="search-input"
              placeholder="search"
              value={text} //input tag will referance this value every time when value inside it changes
              onChange={updateFilters} //dont invoke it here
            />
          </div>
          <div className="form-control">
            <h5>categories</h5>
            {categories.map((c, index) => {
              return (
                <button
                  key={index}
                  onClick={updateFilters}
                  name="category"
                  // adding active class dynamically
                  className={`${
                    category === c.toLowerCase() ? "active" : null
                  }`}
                  value={c} //value is linked with state
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="form-control">
            {/* very important for name to match  with our initial state in context */}
            <select
              name="company"
              id=""
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((comp, index) => {
                return (
                  <option key={index} value={comp}>
                    {comp}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((colr, index) => {
                if (colr === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      style={{ background: colr }}
                      className={`${
                        colr === "all" ? "all-btn active" : "all-btn"
                      }`}
                      // value={colr}
                      data-color={colr}
                      value="all"
                      onClick={updateFilters}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: colr }}
                    className={`${
                      colr === color ? "color-btn active" : "color-btn"
                    }`}
                    // value={colr}
                    data-color={colr}
                    value={colr}
                    onClick={updateFilters}
                  >
                    {/* {`${colr === color ? <FaCheck /> : ""} `} * use this only  for dynamic class name not for conditional rendering/}
                    
                    {/* <FaCheck /> */}
                    {/* <h1>{colr}</h1> */}
                    {colr === color ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p>{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              id="price"
              onChange={updateFilters}
              min={min_price}
              // by default we start from max price beace we have set price = max price in filter reducer
              max={max_price}
              // by deafult range input wil give us a string but we will fix that in our context
              value={price}
            />
          </div>

          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id=""
              onChange={updateFilters}
              // display box ticked if shipping is true
              // display box unticked if shipping is false
              checked={shipping} //will reflect our value from the state
            />
          </div>
        </form>
        <button type="button" onClick={clearFilters} className="clear-btn">
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  /* input[type="range"] {
    height: 38px;
    -webkit-appearance: none;
    
    margin-right: "10px";
    padding-right: 10px;
    width: 100%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    /* animate: 0.2s; */
  /* box-shadow: 1px 1px 1px #000000;
    background: #3071a9;
    border-radius: 5px;
    border: 1px solid #000000;
  }
  input[type="range"]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 2vh;
    width: 2vh;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    /* margin-top: -11px; */
  /* */
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
