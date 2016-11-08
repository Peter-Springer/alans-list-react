import React, { Component } from 'react';
import {Link} from 'react-router';

class Home extends Component {
  render() {
    return (
      <div className='home-container'>
        <Link to={'/Post'}>
          <button className="home-buttons">Post</button>
        </Link>
        <Link to={'/Browse'}>
          <button className="home-buttons">Browse</button>
        </Link>
      </div>
    );
  }
}

export default Home;
