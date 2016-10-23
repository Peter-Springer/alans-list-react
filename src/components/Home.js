import React, { Component } from 'react';
import {Link} from 'react-router';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Alanslist</h1>
        <Link to={'/Post'}>
        <button>Post</button>
        </Link>
        <Link to={'/Browse'}>
        <button>Browse</button>
        </Link>
      </div>
    );
  }
}

export default Home;
