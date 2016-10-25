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
  return this.state.listings.map(m => <article className="message"
                                       key={m.id}>
                                       {m.title}<br/>
                                       {m.price}<br/>
                                       {m.description}
                                     </article>)
}

  render() {
    return (
      <section className="browse">
        <h1>ALL LISTINGS</h1>
        {this.renderListings()}
      </section>
    );
  }
}

export default Browse;
