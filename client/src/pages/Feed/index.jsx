
import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/Profile';
import { getFeed, changeFollow } from '../../thunks/feed';
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
    const { getFeedAction, id } = this.props;

    getFeedAction(id);
  }

  openModal(modalUsers, modalTitle) {
    this.setState({
      modalUsers,
      modalTitle,
    }, this.modalRef.current.open());
  }

  render() {
    const { feed, changeFollowAction } = this.props;
    console.log(feed);
    const { modalTitle, modalUsers } = this.state;
    if (!feed) {
      return null;
    }

    return (
      <Fragment>
        <Segment>
          <SubHeader header="Profile" />
          <Profile user={feed} />
          <Button
            disabled={!feed.followers.length}
            basic
            content={`Followers: ${feed.followers.length}`}
            onClick={() => this.openModal(feed.followers, 'Followers')}
          />
          <Button
            disabled={!feed.following.length}
            basic
            content={`Following: ${feed.following.length}`}
            onClick={() => this.openModal(feed.following, 'Following')}
          />

          <Button
            basic
            content="user2@test.com add/remove user-205"
            onClick={() => changeFollowAction(feed.id, 210, 205)}
          />
          <FollowModal ref={this.modalRef} title={modalTitle} users={modalUsers} />
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
  id: PropTypes.string.isRequired,
  getFeedAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, feed }) => (
  {
    id: auth.get('user').get('user').get('id'),
    feed: feed.get('feed'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getFeedAction: getFeed,
    changeFollowAction: changeFollow,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Feed),
);
