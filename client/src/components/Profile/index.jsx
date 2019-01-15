
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import style from './style.scss';
import CreateEventModal from '../CreateEventModal';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.modalRef = React.createRef();
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.modalRef.current.open();
  }

  render() {
    const { user, createEventAction } = this.props;
    return (
      <div className={style.card} key={user.id}>
        <div>Name: {user.name}</div>
        <div>City: {user.city}</div>
        {user.isMusician ? <div>Instrument: {user.instrument}</div> : null}
        {user.isMusician && (
          <Fragment>
            <Button content="Create event" onClick={this.openModal} />
            <CreateEventModal
              ref={this.modalRef}
              id={user.id}
              neoId={user.neoId}
              createEventAction={createEventAction}
            />
          </Fragment>)}
      </div>
    );
  }
}

Profile.defaultProps = {
  createEventAction: () => {},
};

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
  createEventAction: PropTypes.func,
};

export default Profile;
