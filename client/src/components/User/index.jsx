

import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const User = ({ user: { id, name }, currentUser, changeFollowAction }) => (
  <div key={`${id}${name}`}>
    {name}
    <Button
      onClick={() => changeFollowAction(currentUser.id, currentUser.neoId, id)}
      content={
          currentUser.following
          && currentUser.following.filter(({ id: followId }) => followId === id).length > 0
            ? 'Unfollow'
            : 'Follow'
        }
    />
  </div>
);

User.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default User;
