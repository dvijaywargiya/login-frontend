import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { AuthContext } from "../App";


function NavBar(props) {
    const history = useHistory();
    const { dispatch } = React.useContext(AuthContext);
    return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        <h1>EOS Icon Request</h1>
      </Link>
      {props.state.isAuthenticated && <Link className="nav-item" to="/allRequests">
        All Requests
      </Link>}
      {props.state.isAuthenticated && <button type="button" className="btn btn-link" onClick={(e) => {
          e.preventDefault();
          history.push("/");
          dispatch({
            type: "LOGOUT",
            payload: ""
            });
        }}>
        Log Out
      </button>}
    </nav>
  );
}

export default NavBar;