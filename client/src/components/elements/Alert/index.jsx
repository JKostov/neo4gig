
import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

const Alert = (props) => {
  const { message } = props;
  const properties = omit(props, ['message']);

  return <Message error content={message} {...properties} />;
};

export default Alert;

Alert.propTypes = {
  header: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.string),
  message: PropTypes.string,
  className: PropTypes.string,
  'data-cy': PropTypes.string,
};

Alert.defaultProps = {
  header: null,
  list: null,
  message: null,
  className: null,
  'data-cy': null,
};
