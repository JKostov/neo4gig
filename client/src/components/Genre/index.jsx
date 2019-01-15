
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './style.scss';
import FollowModal from '../FollowModal';

class Genre extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    const { getSuggestedPeopleAction, currentUser, genre: { id } } = this.props;
    getSuggestedPeopleAction(currentUser.neoId, id)
      .then(this.modalRef.current.open());
  }

  render() {
    const {
      genre: {
        id, name, description, userFollowers,
      }, currentUser, changeInterestAction, changeFollowAction, suggestedPeople, isFeed,
    } = this.props;

    return (
      <div className={style.card} key={id}>
        <div>Name: {name}</div>
        <div>Description: {description}</div>
        { !isFeed && (
          <Button
            onClick={() => changeInterestAction(currentUser.id, currentUser.neoId, id)}
            content={
              userFollowers
              && userFollowers.filter(({ id: userId }) => userId === currentUser.neoId).length > 0
                ? 'Dislike'
                : 'Like'
            }
          />)
        }
        <Button content="Get suggested" onClick={this.openModal} />
        <FollowModal
          currentUser={currentUser}
          changeFollowAction={changeFollowAction}
          ref={this.modalRef}
          title={`People loving ${name}`}
          users={suggestedPeople}
        />
      </div>
    );
  }
}

Genre.defaultProps = {
  changeInterestAction: () => {},
  currentUser: null,
  isFeed: false,
};

Genre.propTypes = {
  getSuggestedPeopleAction: PropTypes.func.isRequired,
  suggestedPeople: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  changeInterestAction: PropTypes.func,
  currentUser: PropTypes.shape({}),
  genre: PropTypes.shape({}).isRequired,
  isFeed: PropTypes.bool,
};

export default Genre;
