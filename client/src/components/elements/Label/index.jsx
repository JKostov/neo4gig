
import React from 'react';
import PropTypes from 'prop-types';
import { Label as LabelSemantic } from 'semantic-ui-react';

const Label = (props) => {
  const { publish } = props;
  const color = publish ? 'green' : 'orange';
  const text = publish ? 'Live' : 'Draft';
  return <LabelSemantic color={color}>{text}</LabelSemantic>;
};

Label.defaultProps = {
  publish: false,
};

Label.propTypes = {
  publish: PropTypes.bool,
};

export default Label;
