
import React, { Component } from 'react';
import {
  Menu, MenuItem, Container, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.itemChangeCallback = this.itemChangeCallback.bind(this);
  }

  itemChangeCallback(url) {
    const { activeItem, onItemChange } = this.props;
    if (activeItem === url) {
      return;
    }
    onItemChange(url);
  }

  leftMenu() {
    return (
      <React.Fragment>
        <MenuItem name="home" onClick={() => this.itemChangeCallback('/')} />
      </React.Fragment>
    );
  }

  rightMenu() {
    const { isLoggedIn } = this.props;

    return (
      <Menu.Menu position="right">
        {isLoggedIn ? this.rightMenuUser() : this.rightMenuGuest()}
      </Menu.Menu>
    );
  }

  rightMenuUser() {
    const { isAdmin } = this.props;

    const adminMenuItem = isAdmin && (
      <MenuItem
        name="Admin"
        onClick={() => this.itemChangeCallback('/admin')}
      />
    );

    return (
      <React.Fragment>
        {adminMenuItem}
        <MenuItem
          name="logout"
          onClick={() => this.itemChangeCallback('/logout')}
        />
      </React.Fragment>
    );
  }

  rightMenuGuest() {
    return (
      <React.Fragment>
        <MenuItem name="login" onClick={() => this.itemChangeCallback('/login')} />
        <MenuItem name="sign up" onClick={() => this.itemChangeCallback('/register')} />
      </React.Fragment>
    );
  }

  render() {
    const { className } = this.props;

    const segmentClass = classNames(style.segment, {
      [className]: className,
    });

    return (
      <Segment className={segmentClass}>
        <Menu pointing secondary size="large">
          <Container>
            {this.leftMenu()}
            {this.rightMenu()}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

Header.defaultProps = {
  isAdmin: false,
  isLoggedIn: false,
  activeItem: '/',
  className: null,
};

Header.propTypes = {
  isAdmin: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  activeItem: PropTypes.string,
  className: PropTypes.string,
  onItemChange: PropTypes.func.isRequired,
};

export default Header;
