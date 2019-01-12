
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGenres } from '../../thunks/genre';
import Genre from '../../components/Genre';
import style from './style.scss';

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

    return (
      <div className={style.grid}>
        {genres.map(genre => <Genre key={genre.id} genre={genre} />)}
      </div>
    );
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
