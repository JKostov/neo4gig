
import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/Profile';
import { getFeed, changeFollow, createEvent } from '../../thunks/feed';
import EventList from '../../components/EventList';
import { Segment, SubHeader } from '../../components/elements';
import GenreList from '../../components/GenreList';
import FollowModal from '../../components/FollowModal';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: '',
      modalUsers: [],
    };

    this.modalRef = React.createRef();
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { getFeedAction, user } = this.props;

    getFeedAction(user.get('id'));
  }

  openModal(modalUsers, modalTitle) {
    this.setState({
      modalUsers,
      modalTitle,
    }, this.modalRef.current.open());
  }

  render() {
    const { feed, changeFollowAction, createEventAction } = this.props;
    const { modalTitle, modalUsers } = this.state;
    if (!feed) {
      return null;
    }

    return (
      <Fragment>
        <Segment>
          <SubHeader header="Profile" />
          <Profile user={feed} createEventAction={createEventAction} />
          <Button
            disabled={feed.followers ? !feed.followers.length : true}
            basic
            content={`Followers: ${feed.followers ? feed.followers.length : 0}`}
            onClick={() => this.openModal(feed.followers, 'Followers')}
          />
          <Button
            disabled={feed.following ? !feed.following.length : true}
            basic
            content={`Following: ${feed.following ? feed.following.length : 0}`}
            onClick={() => this.openModal(feed.following, 'Following')}
          />
          <FollowModal
            currentUser={feed}
            changeFollowAction={changeFollowAction}
            ref={this.modalRef}
            title={modalTitle}
            users={modalUsers}
          />
        </Segment>
        <Segment>
          <SubHeader header="Genres you're interested in" />
          <GenreList genres={feed.genres} />
        </Segment>
        <Segment>
          <SubHeader header="Upcoming events in your city" />
          <EventList events={feed.userCityEvents} />
        </Segment>
      </Fragment>);
  }
}

Feed.defaultProps = {
  feed: null,
};

Feed.propTypes = {
  feed: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  getFeedAction: PropTypes.func.isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  createEventAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, feed }) => (
  {
    user: auth.get('user').get('user'),
    feed: feed.get('feed'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getFeedAction: getFeed,
    changeFollowAction: changeFollow,
    createEventAction: createEvent,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Feed),
);
