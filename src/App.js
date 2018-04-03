import React, { Component } from 'react';
import './App.css';

import PostList from './components/PostList';
import Header from './components/Header';
import SearchInput from './components/SearchInput';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { searchInput: '' };

    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler ({ target: { value } }) {
    this.setState({
      searchInput: value
    })
  }
  render() {
    const { searchInput } = this.state;

    return (
      <div className="container">
        <Header />
        <SearchInput handleChange={this.searchHandler} />
        <PostList searchInput={searchInput} />
      </div>
    );
  }
}

export default App;
