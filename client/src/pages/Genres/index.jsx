
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGenres } from '../../thunks/genre';
import GenreList from '../../components/GenreList';

class Genres extends Component {
  componentDidMount() {
    const { getGenresAction } = this.props;

    getGenresAction();
  }

  render() {
    const { genres } = this.props;

    if (!genres) {
      return null;
    }

    return <GenreList genres={genres} />;
  }
}

Genres.defaultProps = {
  genres: [],
};

Genres.propTypes = {
  getGenresAction: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = ({ genre }) => (
  {
    genres: genre.get('genres'),
  });


const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getGenresAction: getGenres,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Genres),
);
