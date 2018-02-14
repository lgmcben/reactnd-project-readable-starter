import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../App.css';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={PostList}/>
      </div>
    );
  }
}

export default App;
