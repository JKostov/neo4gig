
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../thunks/auth';

const Logout = ({ logoutAction }) => {
  logoutAction();
  return null;
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logoutAction: logout,
  },
  dispatch,
);

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
