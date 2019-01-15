
import React from 'react';
import PropTypes from 'prop-types';
import Band from '../Band';
import style from './style.scss';

const BandList = ({ bands }) => (
  <div className={style.grid}>
    {bands.map(band => <Band key={band.id} band={band} />)}
  </div>);

BandList.defaultProps = {
  bands: [],
};

BandList.propTypes = {
  bands: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default BandList;
