import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Loading = () => {
  const { isLoading } = useAuth0;
  if (isLoading) {
    return (
      <div className="section section-center">
        <h1>processing sign-in</h1>
        <div className="loading"></div>
      </div>
    );
  }
  return (
    <div className="section section-center">
      <div className="loading"></div>
    </div>
  );
};

export default Loading;
