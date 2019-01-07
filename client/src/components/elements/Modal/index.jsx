
import React, { Component } from 'react';
import { Modal as SemanticModal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({ isOpen: false });
  }

  render() {
    const {
      title, actions, children, ...props
    } = this.props;
    const { isOpen } = this.state;

    return (
      <SemanticModal closeIcon open={isOpen} onClose={this.close} {...props}>
        <SemanticModal.Header>{title}</SemanticModal.Header>
        <SemanticModal.Content>{children}</SemanticModal.Content>
        <SemanticModal.Actions>{actions}</SemanticModal.Actions>
      </SemanticModal>
    );
  }
}

Modal.defaultProps = {
  title: '',
  actions: [],
  children: null,
};

Modal.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
};

export default Modal;
