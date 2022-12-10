import React, { Children } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Loading } from "../components";

// const AuthWrapper = () => {
//   const { user, isLoading, error } = useAuth0;
//   if (isLoading) return <Loading />;
//   if (error)
//     return (
//       <Wrapper>
//         <h1>{error.messages}</h1>
//       </Wrapper>
//     );

//   return <>{Children}</>;
// };
const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        {/* <h1>signing in...</h1> */}
        <Loading />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
