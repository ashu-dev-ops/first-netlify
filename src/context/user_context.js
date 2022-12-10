import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { logout, isLoading, loginWithRedirect, user, isAuthenticated } =
    useAuth0();

  console.log(user);
  console.log(isAuthenticated);
  const [myUser, setMyUser] = useState(null);
  // useEffect(() => {
  //   // console.log(isLoading);
  //   // console.log(isAuthenticated);//is boolean and return true if login
  //   // console.log(myUser);//contains data about the use enamil and username
  //   if (isAuthenticated) {
  //     // console.log(user);
  //     setMyUser(user);
  //   } else {
  //     setMyUser(false);
  //   }
  // }, [isAuthenticated]);
  useEffect(() => {
    setMyUser(user);
  }, [user]);
  return (
    <UserContext.Provider value={{ logout, loginWithRedirect, myUser }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
