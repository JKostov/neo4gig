
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from '../Header';
import style from './styles.scss';

const AppLayout = ({
  children, history, location, isLoggedIn, isAdmin,
}) => {
  const changeRoute = (newRoute) => {
    history.push(newRoute);
  };

  return (
    <div>
      <Header
        className={style.headerBottomMargin}
        onItemChange={changeRoute}
        activeItem={location.pathname}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
      <Container>{children}</Container>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

AppLayout.defaultProps = {
  isLoggedIn: false,
  isAdmin: false,
};

export default withRouter(AppLayout);
