
import React from 'react';
import PropTypes from 'prop-types';
import Band from '../Band';
import style from './style.scss';

const BandList = ({ bands, changeLikesAction, currentUser }) => (
  <div className={style.grid}>
    {bands.map(band => (
      <Band
        currentUser={currentUser}
        changeLikesAction={changeLikesAction}
        key={band.id}
        band={band}
      />))}
  </div>);

BandList.defaultProps = {
  bands: [],
  changeLikesAction: () => {},
  currentUser: null,
};

BandList.propTypes = {
  changeLikesAction: PropTypes.func,
  currentUser: PropTypes.shape({}),
  bands: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default BandList;
