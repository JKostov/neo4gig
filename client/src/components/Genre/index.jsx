
import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Genre = ({
  genre: {
    id, name, description, userFollowers,
  }, currentUser, changeInterestAction,
}) => (
  <div className={style.card} key={id}>
    <div>Name: {name}</div>
    <div>Description: {description}</div>
    {currentUser && (
    <Button
      onClick={() => changeInterestAction(currentUser.get('id'), currentUser.get('neoId'), id)}
      content={
          userFollowers && userFollowers.filter(({ id: userId }) => userId === currentUser.get('neoId')).length > 0
            ? 'Stop being interested'
            : 'Interest'
        }
    />
    )}
  </div>
);

Genre.defaultProps = {
  changeInterestAction: () => {},
  currentUser: null,
};

Genre.propTypes = {
  changeInterestAction: PropTypes.func,
  currentUser: PropTypes.shape({}),
  genre: PropTypes.shape({}).isRequired,
};

export default Genre;
