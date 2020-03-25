import React, { useState, useEffect } from "react";
import { AuthContext } from "../App";
import axios from 'axios';
import './rc-mentions.css';

import Mentions from 'rc-mentions';

const { Option } = Mentions;


export const Home = () => {
  const { dispatch } = React.useContext(AuthContext);
  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch({
        type: "LOGOUT",
        payload: ""
    });
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:1337/users");
      let tempVar = response.data.map((ele) => {
        return {id:ele.id, display:ele.username};
      })
      setUsers(tempVar);
    }
    fetchUsers();
  }, []);

  const [commentState, setCommentState] = useState({comment:""});

  return (
      <div className="home">
          <button onClick={handleFormSubmit}> LOG OUT </button>
          <br/>
          <br/>
          <div>
            <Mentions
              autoFocus
              rows={4}
              defaultValue=""
              placeholder="Start mentioning with @"
            >
              {
              users.map( user => {
                return <Option key={user.id} value={user.display}>{user.display}</Option>
              })}
            </Mentions>
          </div>
      </div>
    );
};
export default Home;