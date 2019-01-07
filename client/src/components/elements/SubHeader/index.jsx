
import React from 'react';
import classNames from 'classnames';
import { Header as HeaderSemantic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './style.scss';

const SubHeader = ({ header, className, ...props }) => (
  <HeaderSemantic as="h2" className={classNames([style.subHeader, className])} {...props}>
    {header}
  </HeaderSemantic>
);

SubHeader.defaultProps = {
  header: '',
  className: null,
};

SubHeader.propTypes = {
  header: PropTypes.string,
  className: PropTypes.string,
};

export default SubHeader;
