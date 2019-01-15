
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {changeAttendance, getAnticipatedEvents} from '../../thunks/anticipatedEvents';
import EventList from '../../components/EventList';

class AnticipatedEvents extends Component {
  componentDidMount() {
    const { getAnticipatedEventsAction } = this.props;

    getAnticipatedEventsAction();
  }

  render() {
    const { anticipatedEvents, changeAttendanceAction, currentUser } = this.props;

    if (!anticipatedEvents.length) {
      return null;
    }
    return (
      <EventList
        currentUser={currentUser}
        changeAttendanceAction={changeAttendanceAction}
        events={anticipatedEvents}
      />
    );
  }
}

AnticipatedEvents.defaultProps = {
  anticipatedEvents: [],
};

AnticipatedEvents.propTypes = {
  getAnticipatedEventsAction: PropTypes.func.isRequired,
  anticipatedEvents: PropTypes.arrayOf(PropTypes.shape({})),
  changeAttendanceAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth, anticipatedEvents }) => (
  {
    currentUser: auth.get('user').get('user'),
    anticipatedEvents: anticipatedEvents.get('anticipatedEvents'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAnticipatedEventsAction: getAnticipatedEvents,
    changeAttendanceAction: changeAttendance,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AnticipatedEvents),
);
