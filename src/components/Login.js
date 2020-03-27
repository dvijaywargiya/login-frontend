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
      <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login/SignUp</h1>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="login" checked={data.login === true} onChange={handleRadioLogin}/>
              <label className="form-check-label" htmlFor="inlineRadio1">Login</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="signup" checked={data.login === false} onChange={handleRadioSignUp}/>
              <label className="form-check-label" htmlFor="inlineRadio2">SignUp</label>
            </div>
              {
                !data.login ?
                  <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={data.username}
                    onChange={handleInputChange}
                    name="username"
                    id="username"
                    placeholder="Username"
                    />
                </div>: ''
              }
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={data.email}
                  onChange={handleInputChange}
                  name="email"
                  id="email"
                  placeholder="Email Address"
                />
                <small 
                  id="emailHelp" 
                  className="form-text text-muted">
                    We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  value={data.password}
                  onChange={handleInputChange}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>

          <button disabled={data.isSubmitting} className="btn btn-primary btn-lg">
            {data.isSubmitting ? (
              "Loading..."
            ) : (
              data.login ?
                "Login" : "SignUp"
            )}
          </button>
          {data.errorMessage && (
            <span className="form-error">{data.errorMessage}</span>
          )}
          </form>
      </div>
    );
};
export default Login;