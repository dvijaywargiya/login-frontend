import React from "react";
import axios from 'axios';
import { AuthContext } from "../App";

export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    username: "",
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
    login: true
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
  };
  const handleRadioLogin = event => {
    setData({
      ...data,
      login: true
    });
  };
  const handleRadioSignUp = event => {
    setData({
      ...data,
      login: false
    });
  };
  const handleFormSubmit = event => {
      event.preventDefault();
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null
      });
      if (data.login){
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
        }else{
          axios.post('http://localhost:1337/auth/local/register', {
            username: data.username,
            email: data.email,
            password: data.password
          })
          .then(response => {
            dispatch({
                type: "SIGNUP",
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
        }
  };
  return (
      <div className="login-container">
        <div className="card">
          <div className="container">
            <form onSubmit={handleFormSubmit}>
              <h1>Login/SignUp</h1>
                <label htmlFor="login">Login</label>
                <input type="radio" value="login" name="group1" checked={data.login === true} onChange={handleRadioLogin}/>
                <label htmlFor="signup">SignUp</label>
                <input type="radio" value="signup" name="group1"checked={data.login === false} onChange={handleRadioSignUp}/>
                <br/>
                <br/>
                <br/>
                {
                  !data.login ? 
                  <label htmlFor="username">
                    Username
                    <input
                      type="text"
                      value={data.username}
                      onChange={handleInputChange}
                      name="username"
                      id="username"
                    />
                  </label> : ''
                }
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
                data.login ?
                  "Login" : "SignUp"
              )}
            </button>
            </form>
          </div>
        </div>
      </div>
    );
};
export default Login;