import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <Wrapper className="section-center">
      <div className="section-center">
        <h3>join our newsletter and get 20% off</h3>
        <div className="content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>

          <form
            className="contact-form"
            action="https://formspree.io/f/meqdwjyd"
            method="POST"
          >
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="enter email"
            />
            <button className="submit-btn" type="submit">
              subscribe
            </button>
          </form>
          {/* <form
            id="fs-frm"
            name="simple-contact-form"
            accept-charset="utf-8"
            action="https://formspree.io/f/xjvzqjan"
            method="post"
          >
            <fieldset id="fs-frm-inputs">
              <label for="full-name">Full Name</label>
              <input
                type="text"
                name="name"
                id="full-name"
                placeholder="First and Last"
                required=""
              />
              <label for="email-address">Email Address</label>
              <input
                type="email"
                name="_replyto"
                id="email-address"
                placeholder="email@domain.tld"
                required=""
              />
              <label for="message">Message</label>
              <textarea
                rows="5"
                name="message"
                id="message"
                placeholder="Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla nullam quis risus."
                required=""
              ></textarea>
              <input
                type="hidden"
                name="_subject"
                id="email-subject"
                value="Contact Form Submission"
              />
            </fieldset>
            <input type="submit" value="Submit" />
          </form> */}
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
