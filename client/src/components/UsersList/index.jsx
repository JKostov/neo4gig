
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import User from '../User';

const UserList = ({ users }) => (
  <Fragment>
    {users.map(user => <User key={user.id} user={user} />)}
  </Fragment>);

UserList.defaultProps = {
  users: [],
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default UserList;
