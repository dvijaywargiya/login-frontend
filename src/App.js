import React from 'react';
import "./App.css";
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Requests from './Requests/Requests';
import Request from './Request/Request';
import {authReducer} from "./utils/Utilities";
import Login from "./components/Login";
import Home from "./components/Home";
import NoAccess from "./components/NoAccess"

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
        <div>
          <NavBar state={state}/>
          <Route exact path='/' component={state.isAuthenticated ? Home: Login}/>
          <Route exact path='/allRequests' component={state.isAuthenticated ? Requests: NoAccess}/>
          <Route exact path='/requests/:requestId' component={state.isAuthenticated ? Request: NoAccess}/>
        </div>
    </AuthContext.Provider>
  );
}

export default App;