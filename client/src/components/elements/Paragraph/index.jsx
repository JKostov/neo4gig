
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classNames from 'classnames';
import style from './style.scss';

function Paragraph({ children, className, ...extraProps }) {
  const paragraphStyle = classNames(style.formatting, {
    [className]: className,
  });

  const newProps = omit(extraProps, ['children', 'className']);

  return (
    <p className={paragraphStyle} {...newProps}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Paragraph.defaultProps = {
  className: null,
  children: null,
};

export default Paragraph;
