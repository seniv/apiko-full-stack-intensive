import React, { Component } from 'react';
import './App.css';
import postsData from './data.json';

import PostList from './components/PostList';
import MoreButton from './components/MoreButton';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ItemsNotFound from './components/ItemsNotFound';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { posts: [] };
    this.data = [];

    this.showMore = this.showMore.bind(this);
    this.fakeLoadData = this.fakeLoadData.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }
  showMore () {
    const { posts } = this.state;
    const newPosts = this.data.slice(posts.length, posts.length + 10);
    this.setState({
      posts: posts.concat(newPosts)
    });
  }
  fakeLoadData (search = '') {
    const regExp = RegExp(search, 'i');
    this.data = postsData.filter(post => regExp.test(post.title));
    this.setState({
      posts: this.data.slice(0, 10)
    });
  }
  searchHandler ({ target: { value } }) {
    this.fakeLoadData(value);
  }
  componentDidMount () {
    this.fakeLoadData();
  }
  render() {
    return (
      <div className="container">
        <Header />
        <SearchInput handleChange={this.searchHandler} />
        { this.state.posts.length > 0
          ? <PostList posts={this.state.posts} />
          : <ItemsNotFound />
        }
        { this.data.length > this.state.posts.length && <MoreButton onClick={this.showMore} /> }
      </div>
    );
  }
}

export default App;
