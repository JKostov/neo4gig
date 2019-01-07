
import React from 'react';
import classNames from 'classnames';
import { Header as HeaderSemantic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Header = ({ header, className, ...props }) => (
  <HeaderSemantic as="h1" className={classNames([style.customHeader, className])} {...props}>
    {header}
  </HeaderSemantic>
);

Header.defaultProps = {
  header: '',
  className: null,
};

Header.propTypes = {
  header: PropTypes.string,
  className: PropTypes.string,
};

export default Header;
