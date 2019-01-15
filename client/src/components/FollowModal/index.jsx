
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../elements';
import UserList from '../UsersList';

class FollowModal extends Component {
  constructor(props) {
    super(props);

    this.modalRef = React.createRef();
  }

  getModalActionsAndChildren() {
    const { users, changeFollowAction, currentUser } = this.props;
    return {
      children: (
        <UserList
          currentUser={currentUser}
          changeFollowAction={changeFollowAction}
          users={users}
        />
      ),
    };
  }

  open() {
    this.modalRef.current.open();
  }

  handleModalClose() {
    this.modalRef.current.close();
  }

  render() {
    const { title } = this.props;
    const { actions, children } = this.getModalActionsAndChildren();
    return (
      <Modal ref={this.modalRef} title={title} actions={actions}>
        {children}
      </Modal>
    );
  }
}

FollowModal.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  changeFollowAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
export default FollowModal;
