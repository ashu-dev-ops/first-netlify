import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { id, colors, stock } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  // console.log(colors, id, stock);
  const [amount, setAmount] = useState(1);
  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmt = oldAmount + 1;
      if (tempAmt > stock) {
        tempAmt = stock;
      }
      return tempAmt;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmt = oldAmount - 1;
      if (tempAmt < 1) {
        tempAmt = 1;
      }
      return tempAmt;
    });
  };
  // const decrease = () => {};
  return (
    <Wrapper>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link to="/cart" className="btn">
          add to cart
        </Link>
      </div>
      <div className="colors">
        <span></span>
        <div className="">
          {colors.map((color, index) => {
            return (
              <button
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`}
                key={index}
                style={{ background: color }}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
