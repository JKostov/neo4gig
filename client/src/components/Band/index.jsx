
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './style.scss';
import FollowModal from '../FollowModal';

class Band extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    const { getSuggestedPeopleAction, currentUser, band: { id } } = this.props;
    getSuggestedPeopleAction(currentUser.neoId, id)
      .then(this.modalRef.current.open());
  }

  render() {
    const {
      band: {
        id, name, description, likes,
      }, currentUser, changeLikesAction, changeFollowAction, suggestedPeople,
    } = this.props;
    return (
      (
        <div className={style.card} key={id}>
          <div>Name: {name}</div>
          <div>Description: {description}</div>
          {currentUser && (
            <Button
              onClick={() => changeLikesAction(currentUser.id, currentUser.neoId, id)}
              content={
                likes && likes.filter(({ id: userId }) => userId === currentUser.neoId).length > 0
                  ? 'Dislike'
                  : 'Like'
              }
            />
          )}
          <Button content="Get suggested" onClick={this.openModal} />
          <FollowModal
            currentUser={currentUser}
            changeFollowAction={changeFollowAction}
            ref={this.modalRef}
            title={`People loving ${name}`}
            users={suggestedPeople}
          />
        </div>
      )
    );
  }
}

Band.defaultProps = {
  changeLikesAction: () => {},
  currentUser: null,
};

Band.propTypes = {
  changeLikesAction: PropTypes.func,
  currentUser: PropTypes.shape({}),
  band: PropTypes.shape({}).isRequired,
  getSuggestedPeopleAction: PropTypes.func.isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  suggestedPeople: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Band;
