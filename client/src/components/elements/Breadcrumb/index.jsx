
import React from 'react';
import { Breadcrumb as SemanticBreadcrumb } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import connect from 'react-redux/es/connect/connect';
import style from './style.scss';

const Breadcrumb = ({ sections, className }) => (
  <SemanticBreadcrumb data-cy="breadcrumb" className={classNames([style.breadcrumb, className])}>
    <SemanticBreadcrumb.Section href="/">Home</SemanticBreadcrumb.Section>
    <SemanticBreadcrumb.Divider />
    {sections.map(({ name, link, isActive }, index) => (
      <React.Fragment key={name}>
        <SemanticBreadcrumb.Section href={link} active={isActive}>
          {name}
        </SemanticBreadcrumb.Section>
        {index !== sections.length - 1 && <SemanticBreadcrumb.Divider />}
      </React.Fragment>
    ))}
  </SemanticBreadcrumb>
);

Breadcrumb.defaultProps = {
  sections: [],
  className: null,
};

Breadcrumb.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      isActive: PropTypes.bool,
    }),
  ),
  className: PropTypes.string,
};

const mapStateToProps = ({ breadcrumb }) => ({
  sections: breadcrumb.get('sections'),
});

export default connect(mapStateToProps)(Breadcrumb);
