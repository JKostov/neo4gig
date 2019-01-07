
import React from 'react';
import PropTypes from 'prop-types';
import { Segment as SemanticSegment } from 'semantic-ui-react';
import style from './style.scss';

const Segment = ({ children }) => (
  <SemanticSegment className={style.squared}>{children}</SemanticSegment>
);

Segment.defaultProps = {
  children: null,
};

Segment.propTypes = {
  children: PropTypes.node,
};

export default Segment;
