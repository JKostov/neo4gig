
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import User from '../User';

const UserList = ({ users, currentUser, changeFollowAction }) => (
  <Fragment>
    {users.map(user => (
      <User
        key={`${user.id}${user.name}`}
        currentUser={currentUser}
        changeFollowAction={changeFollowAction}
        user={user}
      />
    ))}
  </Fragment>);

UserList.defaultProps = {
  users: [],
};

UserList.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default UserList;
