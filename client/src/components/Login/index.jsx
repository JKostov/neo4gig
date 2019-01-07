
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Label, Form, Input, Button,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import { Alert } from '../elements';
import style from './style.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validationError: null,
      loading: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
  }

  onForgotPassword(e) {
    e.preventDefault();

    const { push } = this.props;
    push('/forgot-password');
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  runLoginAction() {
    const { email, password } = this.state;
    const { login: loginAction } = this.props;
    this.setState({ loading: true });
    loginAction(email, password).catch((e) => {
      const { data } = e.response;
      this.setError(data.message);
      this.setState({ loading: false });
    });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.runLoginAction();
    }
  }

  validateForm() {
    const { email, password } = this.state;
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(new Error('Invalid email format.')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required.')),
    });

    const result = Joi.validate({ email, password }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  render() {
    const {
      email, password, validationError, loading,
    } = this.state;

    return (
      <Form
        error={!!validationError}
        className={style.form}
        onSubmit={this.handleSubmit}
        noValidate
      >
        <Alert className={style.errorMessage} data-cy="error_login" message={validationError} />
        <Form.Field>
          <Label className={style.label}>Email</Label>
          <Input
            data-cy="email_login"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleEmailChange}
          />
        </Form.Field>
        <Form.Field>
          <Label className={style.label}>Password</Label>
          <Input
            data-cy="pass_login"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </Form.Field>
        <Button
          loading={loading}
          disabled={loading}
          color="blue"
          type="submit"
          data-cy="submit_login"
        >
          Login
        </Button>
        <Button basic color="blue" onClick={this.onForgotPassword}>
          Forgot password?
        </Button>
      </Form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default Login;
