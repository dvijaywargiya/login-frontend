import React, { useState, useEffect } from "react";
import { AuthContext } from "../App";
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import axios from 'axios';

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
  
  // const saveComment = () => {
  //   let newComment = commentState.comment;
  //   newComment = newComment.split('@@@__').join('<a href=\'/user/')
  //   newComment = newComment.split('^^^__').join('\'>')
  //   newComment = newComment.split('@@@^^^').join('</a>');
  //   if (newComment !== '') {
  //     let comment = newComment.trim();
  //     console.log(comment);
  //     // //Call to your DataBase like backendModule.saveComment(comment,  along_with_other_params);
  //     // this.setState({
  //     //   comment: '',
  //     // })
  //   }
  // }
  return (
      <div className="home">
          <button onClick={handleFormSubmit}> LOG OUT </button>
          <div>
            <MentionsInput
              value={commentState.comment}
              onChange={event => setCommentState({comment: event.target.value})}
              style={defaultStyle}
              placeholder={"Mention people using '@'"}
            >
            <Mention data={users} style={defaultMentionStyle} />
            </MentionsInput>
          </div>
      </div>
    );
};
export default Home;