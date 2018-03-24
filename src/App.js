import React, { Component } from 'react';
import './App.css';
import data from './data.json';

import PostList from './components/PostList';
import MoreButton from './components/MoreButton';
import Header from './components/Header';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { posts: [] };

    this.loadMore = this.loadMore.bind(this);
  }
  loadMore () {
    const { posts } = this.state;
    const newPosts = data.slice(posts.length, posts.length + 10)
    this.setState({
      posts: posts.concat(newPosts)
    });
  }
  componentDidMount () {
    this.loadMore();
  }
  render() {
    return (
      <div className="container">
        <Header />
        <PostList posts={this.state.posts} />
        <MoreButton onClick={this.loadMore} />
      </div>
    );
  }
}

export default App;
