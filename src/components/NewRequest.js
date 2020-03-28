import React, { useContext } from "react";
import {useHistory} from 'react-router-dom';
import { AuthContext } from "../App";
import axios from 'axios';

export const NewRequest = () => {
  const { state } = useContext(AuthContext)
  const history = useHistory();
  const initialState = {
    title: "",
    description: "",
    author: state.user.username,
    isSubmitting: false,
    errorMessage: null,
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

    axios({
        method: "post",
        url: "http://localhost:1337/requests",
        headers: {
            "authorization": `Bearer ${state.token}`,
            "content-type": "application/json",
        },
        data: {
            "Title": data.title,
            "Description": data.description,
            "Author": data.author,
            "PositiveVotes": 0,
            "NegativeVotes": 0
        }
    }).then(response => {
        console.log(response)
        history.push("/")
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
      <div className="container">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="exampleTitle">Title</label>
                <input type="text" name="title" className="form-control" id="exampleInputTitle" placeholder="Enter Title" onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleTitle">Description</label>
                <textarea name="description" className="form-control" id="Description" rows="5" onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="exampleAuthor">Author</label>
                <input type="text" readOnly className="form-control-plaintext" id="author" value={state.user.username} />
            </div>
            <button type="submit" className="btn btn-danger btn-lg" disabled={data.isSubmitting}>Submit</button>
            </form>
      </div>
    );
};
export default NewRequest;