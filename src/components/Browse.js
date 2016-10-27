//html file api
//
import React, { Component } from 'react';
import axios from 'axios';

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      listings: []
    }

  }

componentDidMount() {
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

renderListings() {
  console.log('href')
  return this.state.listings.map(l => <article className="listing"
                                       key={l.id}>
                                       {l.title}<br/>
                                      ${l.price}<br/>
                                       {l.description}
                                     </article>)
}

  render() {
    return (
      <section className="browse">
        <h1 className='view-listing-header'>ALL LISTINGS</h1>
        <section className="all-listings">{this.renderListings()}</section>
      </section>
    );
  }
}

export default Browse;
