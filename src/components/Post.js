import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  constructor() {
  super();
  this.state = {
    title: '',
  };
}

  handleTitleValue(e) {
      this.setState({ title: e.target.value })
    }

    sendPostToListing() {
      axios.post('http://localhost:8080/api/v1/listing', {
      title: 'does this work???',
      price: '5',
      description: 'test post request',
      user_id: '1',
      category_id: '1',
    })
    .then(function () {
      console.log("this worked!");
    })
    .catch(function () {
      console.log("ah shitt");
    });
  }

  render() {
    return (
      <div className="post">
        <h1>MAKE A POST</h1>
        <input
          placeholder="title"
          onChange={(e)=>this.handleTitleValue(e)}
          />
        <button
          onClick={()=>this.sendPostToListing()}
          >submit</button>
      </div>
    );
  }
}

export default Post;
