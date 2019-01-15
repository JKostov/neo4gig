
import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Band = ({
  band: {
    id, name, description, likes,
  }, currentUser, changeLikesAction,
}) => (
  <div className={style.card} key={id}>
    <div>Name: {name}</div>
    <div>Description: {description}</div>
    {currentUser && (
    <Button
      onClick={() => changeLikesAction(currentUser.get('id'), currentUser.get('neoId'), id)}
      content={
            likes && likes.filter(({ id: userId }) => userId === currentUser.get('neoId')).length > 0
              ? 'Dislike'
              : 'Like'
          }
    />
    )}
  </div>
);

Band.defaultProps = {
  changeLikesAction: () => {},
  currentUser: null,
};

Band.propTypes = {
  changeLikesAction: PropTypes.func,
  currentUser: PropTypes.shape({}),
  band: PropTypes.shape({}).isRequired,
};

export default Band;
