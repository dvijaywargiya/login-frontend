import React from "react";
import axios from 'axios';
import { AuthContext } from "../App";

export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
  };
  const handleFormSubmit = event => {
      event.preventDefault();
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null
      });
      axios.post("http://localhost:1337/auth/local", {
          identifier: data.email,
          password: data.password
        })
        .then(response => {
          dispatch({
              type: "LOGIN",
              payload: response.data
          })
        })
        .catch(error => {
          console.log(error.response);
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText
          });
        });
  };
  return (
      <div className="login-container">
        <div className="card">
          <div className="container">
            <form onSubmit={handleFormSubmit}>
              <h1>Login</h1>
                <label htmlFor="email">
                        Email Address
                        <input
                          type="text"
                          value={data.email}
                          onChange={handleInputChange}
                          name="email"
                          id="email"
                        />
                </label>
                <label htmlFor="password">
                        Password
                        <input
                          type="password"
                          value={data.password}
                          onChange={handleInputChange}
                          name="password"
                          id="password"
                        />
                </label>

        {data.errorMessage && (
          <span className="form-error">{data.errorMessage}</span>
        )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}
            </button>
            </form>
          </div>
        </div>
      </div>
    );
};
export default Login;