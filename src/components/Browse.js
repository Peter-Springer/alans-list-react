import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      listings: [],
      token: ''
    }
  }

  componentDidMount() {
    this.getAllListings()
    this.handleToken()
  }

  getAllListings() {
    axios.get('http://localhost:8080/api/v1/listing', {
    })
    .then((response) => {
      this.updateState(response.data)
    })
    .catch(function () {
      console.log("request failed");
    });
  }

  updateState(response) {
    this.setState({ listings: response})
  }

  handleToken() {
    this.setState({ token: localStorage.getItem('id_token') })
  }

  deleteListing(id) {
    axios.delete(`http://localhost:8080/api/v1/listing/${id}`, {
    }).then( () => {
      this.getAllListings()
    }).then( () => {
      this.renderListings()
    })
    .catch( () => {
      console.log("request failed");
    });
  }

  renderListings() {
    return this.state.listings.map(l => <article className="listing"
                                           key={l.id}>
                                           {l.image_url === '' ? null :
                                             <img
                                               className='listing-image'
                                               alt="listing"
                                               src={l.image_url}
                                               />}<br/>
                                             <p className="listing-info">
                                               <span>Title:</span> {l.title}
                                             </p>
                                             <p className="listing-info">
                                                <span>Price: </span>
                                                   ${l.price}
                                            </p>
                                             <p className="listing-info">
                                               <span>Description: </span>
                                               {l.description}
                                             </p>
                                           {l.token === localStorage.getItem('id_token') ?
                                           <button
                                            className="delete-button"
                                            onClick={() => this.deleteListing(l.id)}
                                            >Delete</button>: null}
                                       </article>)
  }

  render() {
    return (
      <section className="browse">
        <h1 className='view-listing-header'>LISTINGS</h1>
        <Link to={'/Post'}>
          <button className="create-post-button">Create a post</button>
        </Link>
        <section className="all-listings">{this.renderListings()}</section>
      </section>
    );
  }
}

export default Browse;
