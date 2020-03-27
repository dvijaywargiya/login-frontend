import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './rc-mentions.css';
import Mentions from 'rc-mentions';

const { Option } = Mentions;


function Request(props) {
    const [request, setRequest] = useState([]);
    useEffect(() => {
      const fetchRequest = async () => {
          console.log(props)
        const response = (await axios.get(`http://localhost:1337/requests/${props.match.params.requestId}`)).data;
        console.log(response)
        setRequest({id:response.id, title:response.Title, description:response.Description, positive:response.PositiveVotes, negative:response.NegativeVotes});
      }
      fetchRequest();
    }, []);

    const [users, setUsers] = useState([])
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
    return (
        <div className="container">
        {request === null && <p>Loading Request...</p>}
        {
          request &&
          <div className="row">
            <div className="jumbotron col-12">
              <h1 className="display-3">{request.title}</h1>
              <p className="lead">{request.description}</p>
              <hr className="my-4" />
              <p>Votes: + {request.positive} - {request.negative}</p>
            </div>
            <Mentions
              singleline
              autoFocus
              rows={2}
              defaultValue=""
              placeholder="Start mentioning with @"
            >
              {
              users.map( user => {
                return <Option key={user.id} value={user.display}>{user.display}</Option>
              })}
            </Mentions>
          </div>
        }
        </div>
      ) 
  }

  export default Request;