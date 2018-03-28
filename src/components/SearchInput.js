import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ handleChange }) => (
  <input className="search-input" onChange={handleChange} placeholder="Search..." />
);

SearchInput.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default SearchInput;