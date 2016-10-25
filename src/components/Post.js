import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class Post extends Component {
  constructor() {
  super();
  this.state = {
    title: '',
    price: '',
    description: '',
    userId: '',
    categoryId: '',
  };
}

  handleTitleValues(e) {
      this.setState({ title: e.target.value })
    }

  handlePriceValues(e) {
      this.setState({ price: e.target.value })
    }

  handleDescriptionValues(e) {
      this.setState({ description: e.target.value })
    }

  handleCategoryId(e) {
    if (e.target.value === 'housing') {
      return this.setState({ categoryId: '1' })
    } else {
      return this.setState({ categoryId: '2' })
    }
  }

    sendPostToListing() {
      axios.post('http://localhost:8080/api/v1/listing', {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      user_id: '1',
      category_id: this.state.categoryId
    })
    .then(function () {
      console.log("this worked!");
    })
    .catch(function () {
      console.log("request failed");
    });
    this.clearPostFields()
  }

  clearPostFields() {
  this.setState({
    title: "",
    price: "",
    description: ""
  })
  document.querySelector(".radio").checked = false;
}

  render() {
    return (
      <div className="post">
        <h1>Create a listing</h1>
        <input
          className="radio"
          type='radio' name="categories" value="housing"
          onChange={(e)=>this.handleCategoryId(e)}
          />Housing
        <input
          className="radio"
          type='radio' name="categories" value="for sale"
          onChange={(e)=>this.handleCategoryId(e)}
          />For Sale
        <input
          placeholder="title"
          onChange={(e)=>this.handleTitleValues(e)}
          value={this.state.title}
          />
        <input
          placeholder="price"
          onChange={(e)=>this.handlePriceValues(e)}
          value={this.state.price}
          />
        <textarea
          placeholder="description"
          onChange={(e)=>this.handleDescriptionValues(e)}
          value={this.state.description}
          />
        <button
          onClick={()=>this.sendPostToListing()}
          >submit</button>
          <Link to={'/Browse'}>
            <button>View all listings</button>
          </Link>
      </div>
    );
  }
}

export default Post;
