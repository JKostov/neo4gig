
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeInterest, getGenres } from '../../thunks/genre';
import GenreList from '../../components/GenreList';

class Genres extends Component {
  componentDidMount() {
    const { getGenresAction } = this.props;

    getGenresAction();
  }

  render() {
    const { genres, changeInterestAction, currentUser } = this.props;

    return (
      <GenreList
        currentUser={currentUser}
        changeInterestAction={changeInterestAction}
        genres={genres}
      />
    );
  }
}

Genres.defaultProps = {
  genres: [],
};

Genres.propTypes = {
  getGenresAction: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})),
  changeInterestAction: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth, genre }) => (
  {
    currentUser: auth.get('user').get('user'),
    genres: genre.get('genres'),
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getGenresAction: getGenres,
    changeInterestAction: changeInterest,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Genres),
);
