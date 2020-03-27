import React, { useContext } from "react";
import { AuthContext } from "../App";

export const Home = () => {
  const { state } = useContext(AuthContext)
  
  return (
      <div className="container">
        {<h2>Hello {state.user.username}</h2>}
      </div>
    );
};
export default Home;