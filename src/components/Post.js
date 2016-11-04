import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'fgztpt0k';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dg8s215g5/image/upload';

class Post extends Component {
  constructor(props) {
  super(props);
  this.state = {
    title: '',
    price: '',
    description: '',
    userId: '',
    categoryId: '',
    uploadedFileCloudinaryUrl: '',
    uploadedFile: '',
  };
}

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  handleChange(e, input) {
    let change = {}
    change[input] = e.target.value
    this.setState(change)
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
      category_id: this.state.categoryId,
      image_url: this.state.uploadedFileCloudinaryUrl,
    })
    .then(function () {
      console.log("this worked!");
    })
    .catch(function () {
      console.log("request failed");
    });
    this.clearPostFields();
  }

  clearPostFields() {
    debugger;
  this.setState({
    title: "",
    price: "",
    description: "",
    uploadedFileCloudinaryUrl: "",
  })
  document.querySelector(".radio").checked = false;
}

  render() {
    return (
    <div className='post-container'>
      <h1 className="listing-header">Create a listing</h1>
      <form className="post">
        <article className="radio-button-container">
          <h1 className="category-header">Categories:</h1>
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
        <article className="input-container">
          <input
            className="title"
            placeholder="title"
            onChange={(e)=>this.handleChange(e, "title")}
            value={this.state.title}
            />
          <input
            className="price"
            type='number'
            placeholder="price"
            onChange={(e)=>this.handleChange(e, "price")}
            value={this.state.price}
            />
        <textarea
          className="description-box"
          placeholder="description"
          name="description"
          onChange={(e)=>this.handleChange(e, "description")}
          value={this.state.description}
          />
        </article>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={(file)=>this.onImageDrop(file)}>
            <p className="img-directions">Drop an image or click to select a file to upload.</p>
          </Dropzone>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
              <div>
                <p>{this.state.uploadedFile.name}</p>
              </div>}
          <article className="create-listing-buttons-container">
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
    </div>
    );
  }
}

export default Post;
