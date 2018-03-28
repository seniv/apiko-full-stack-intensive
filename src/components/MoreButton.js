import React from 'react';
import PropTypes from 'prop-types';

const MoreButton = ({ onClick }) => (
  <button onClick={onClick}>Show more</button>
);

MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default MoreButton;
