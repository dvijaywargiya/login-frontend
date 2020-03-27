import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import {authReducer} from "./utils/Utilities";

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function App() {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  return (
      <AuthContext.Provider value={{state, dispatch}}>
        <Header />
        <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
      </AuthContext.Provider>
    );
}
export default App;