import React from 'react';
import PostListItem from './PostListItem';
import PropTypes from 'prop-types';

const PostList = ({ posts }) => (
  <ul>
    {posts.map(post => (
      <PostListItem key={post.id} post={post} />
    ))}
  </ul>
);

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;
