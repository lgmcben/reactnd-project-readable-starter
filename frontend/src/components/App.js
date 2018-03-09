import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../App.css';
import PostList from './PostList';
import PostDetail from './PostDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={PostList}/>
        <Route path="/:category/:post_id" component={PostDetail}/>
      </div>
    );
  }
}

export default App;
