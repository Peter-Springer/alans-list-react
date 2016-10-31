import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
var url = "";

class Post extends Component {
  constructor() {
  super();
  this.state = {
    title: '',
    price: '',
    description: '',
    userId: '',
    categoryId: '',
    image: '',
  };
}
  componentDidMount() {
    this.filez();
  }

  filez() {
    debugger;
    document.getElementById("file-input").onchange = function(){
      // will log a FileList object, view gifs below
      console.log(this.files[0])
    }
    this.renderImage(this.files)
  }

renderImage(file) {
  // generate a new FileReader object
  var reader = new FileReader();
  // inject an image with the src url
  reader.onload = function(event) {
    url = event.target.result
    document.querySelector(".title-price-container").appendChild("<img src='" + url + "' />")
  }
  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(file);
}



  handleTitleValues(e) {
      this.setState({ title: e.target.value})
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
    this.clearPostFields();
    this.setImage();
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
      <form className="post">
        <h1 className="listing-header">Create a listing</h1>
        <article className="radio-button-container">
          <h1 className="category-header"
            onClick={()=>this.filez()}
            >Choose a category</h1>
        <input
          className="radio"
          type='radio' name="categories" value="housing"
          onChange={(e)=>this.handleCategoryId(e)}
          /> Housing
        <input
          className="radio"
          type='radio' name="categories" value="for sale"
          onChange={(e)=>this.handleCategoryId(e)}
          /> For Sale
        </article>
        <article className="title-price-container">
          <input
            className="title"
            placeholder="title"
            onChange={(e)=>this.handleTitleValues(e)}
            value={this.state.title}
            />
          <input
            className="price"
            type='number'
            placeholder="price"
            onChange={(e)=>this.handlePriceValues(e)}
            value={this.state.price}
            />
        </article>
        <textarea
          className="description-box"
          placeholder="description"
          onChange={(e)=>this.handleDescriptionValues(e)}
          value={this.state.description}
          />
        <input id="file-input" type="file"/>
        <article className="post-buttons-container">
          <button
            className="post-buttons"
            onClick={(e)=>this.sendPostToListing(e.preventDefault())}
            >submit</button>
          <Link to={'/Browse'}>
            <button
            className="post-buttons"
            >View listings</button>
          </Link>
        </article>
      </form>
    );
  }
}

export default Post;
