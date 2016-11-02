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
  // componentDidMount() {
  //   this.filez();
  // }
  //
  // filez() {
  //   document.getElementById("file-input").onchange = function(){
  //     // will log a FileList object, view gifs below
  //     console.log(this.files[0])
  //   }
  // }

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

  handleFiles(e) {
    this.setState({ imageUrl: e.target.value })
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
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={(file)=>this.onImageDrop(file)}>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
          </div>}
        </div>
      </form>
    );
  }
}

export default Post;
