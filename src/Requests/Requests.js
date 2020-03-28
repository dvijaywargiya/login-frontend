import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
  
function Questions() {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
      const fetchRequests = async () => {
        const response = await axios.get("http://localhost:1337/requests");
        let tempVar = response.data.map((ele) => {
          return {id:ele.id, title:ele.Title, description:ele.Description, positive:ele.PositiveVotes, negative:ele.NegativeVotes, author:ele.Author};
        })
        setRequests(tempVar);
      }
      fetchRequests();
    }, []);
    return (
        <div className="container">
          <div className="row">
            {requests === null && <p>Loading Requests...</p>}
            {
              requests && requests.map(request => (
                <div key={request.id} className="col-sm-12 col-md-4 col-lg-4">
                  <Link to={`/requests/${request.id}`}>
                    <div className="card text-white bg-success mb-3">
                    <div className="card-header">+ {request.positive} - {request.negative}</div>
                    <div className="card-header">Author: {request.author}</div>
                      <div className="card-body">
                        <h4 className="card-title">{request.title}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      ) 
  }

  export default Questions;