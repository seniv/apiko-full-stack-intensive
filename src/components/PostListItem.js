import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PostListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { displayBody: false };

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay () {
    this.setState({ displayBody: !this.state.displayBody });
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
