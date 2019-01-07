
import React from 'react';
import { Dropdown as SemanticDropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Dropdown = ({ placeholder, options, handleOnChange }) => (
  <SemanticDropdown
    onChange={handleOnChange}
    placeholder={placeholder}
    fluid
    selection
    options={options}
  />
);

Dropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

export default Dropdown;
