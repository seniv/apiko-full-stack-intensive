import React, { Component } from 'react';
import PostListItem from './PostListItem';
import PropTypes from 'prop-types';

import ItemsNotFound from './ItemsNotFound';
import MoreButton from './MoreButton';
import Loader from './Loader';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const fetchJson = (url, params) => fetch(BASE_URL + url, params).then(res => res.json());

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = { rawPosts: [], displayCount: 10, isLoading: true };

    this.showMore = this.showMore.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  showMore () {
    const { displayCount } = this.state;
    this.setState({
      displayCount: displayCount + 10
    });
  }
  loadData () {
    fetchJson('posts').then(posts => {
      this.setState({
        isLoading: false,
        rawPosts: posts
      });
    });
  }
  static getDerivedStateFromProps (prevProps, prevState) {
    return {
      displayCount: 10
    };
  }
  componentDidMount () {
    this.loadData();
    this.timer = setInterval(this.loadData, 10000);
  }
  componentWillUnmount () {
    clearInterval(this.timer);
  }
  render() {
    const { rawPosts, displayCount, isLoading } = this.state;
    const { searchInput } = this.props;
    
    if (isLoading) {
      return <Loader />;
    }

    const regExp = RegExp(searchInput, 'i');
    const filteredPosts = rawPosts.filter(post => regExp.test(post.title));
    const slicedPosts = filteredPosts.slice(0, displayCount);

    if (!slicedPosts.length) {
      return <ItemsNotFound />;
    }

    return (
      <React.Fragment>
        <ul>
          {slicedPosts.map(post => (
            <PostListItem key={post.id} title={post.title} body={post.body} />
          ))}
        </ul>
        {filteredPosts.length > displayCount && <MoreButton onClick={this.showMore} /> }
      </React.Fragment>
    );
  }
}

PostList.propTypes = {
  searchInput: PropTypes.string.isRequired
};

export default PostList;
