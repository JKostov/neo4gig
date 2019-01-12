
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAnticipatedEvents } from '../../thunks/anticipatedEvents';
import Event from '../../components/Event';
import style from './style.scss';

class AnticipatedEvents extends Component {
  componentDidMount() {
    const { getAnticipatedEventsAction } = this.props;

    getAnticipatedEventsAction();
  }

  render() {
    const { anticipatedEvents } = this.props;

    if (!anticipatedEvents.length) {
      return null;
    }
    return (
      <div className={style.grid}>
        {anticipatedEvents.map(event => <Event key={event.id} event={event} />)}
      </div>
    );
  }
}

AnticipatedEvents.defaultProps = {
  anticipatedEvents: [],
};

AnticipatedEvents.propTypes = {
  getAnticipatedEventsAction: PropTypes.func.isRequired,
  anticipatedEvents: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = ({ anticipatedEvents }) => (
  {
    anticipatedEvents: anticipatedEvents.get('anticipatedEvents'),
  });


const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAnticipatedEventsAction: getAnticipatedEvents,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AnticipatedEvents),
);
