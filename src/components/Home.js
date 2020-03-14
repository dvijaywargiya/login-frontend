import React from "react";
import { AuthContext } from "../App";

export const Home = () => {
  const { dispatch } = React.useContext(AuthContext);
  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch({
        type: "LOGOUT",
        payload: ""
    });
  };
  return (
      <div className="home">
          <button onClick={handleFormSubmit}> LOG OUT </button>
      </div>
    );
};
export default Home;