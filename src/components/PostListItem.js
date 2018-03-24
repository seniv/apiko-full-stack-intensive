import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { displayBody: false };

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay () {
    this.setState({ displayBody: !this.state.displayBody });
  }
  render() {
    const { post } = this.props;
    return (
      <li onClick={this.toggleDisplay}>
        <span className="title">{post.title}</span>
        {this.state.displayBody &&
          <div>{post.body}</div>
        }
      </li>
    );
  }
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostListItem;
