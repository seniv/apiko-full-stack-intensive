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
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.title !== nextProps.title ||
           this.props.body !== nextProps.body ||
           this.state.displayBody !== nextState.displayBody;
  }
  render() {
    const { title, body } = this.props;
    return (
      <li onClick={this.toggleDisplay}>
        <span className="title">{title}</span>
        {this.state.displayBody && <div>{body}</div> }
      </li>
    );
  }
}

PostListItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default PostListItem;
