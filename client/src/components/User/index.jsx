

import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user: { id, name } }) => (
  <div key={id}>{name}</div>
);

User.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default User;
