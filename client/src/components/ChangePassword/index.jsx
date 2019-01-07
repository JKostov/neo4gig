
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Label, Form, Input, Button,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import Alert from '../elements/Alert';
import style from './style.scss';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmedPassword: '',
      validationError: null,
      loading: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmedPasswordChange = this.handleConfirmedPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmedPasswordChange(e) {
    this.setState({ confirmedPassword: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (!this.validateForm()) {
      return;
    }
    const { password } = this.state;
    const { onSubmit, push } = this.props;

    this.setState({ loading: true });

    onSubmit({ password })
      .then(() => {
        if (push) {
          push('/login');
        }
      })
      .catch((error) => {
        const { data } = error.response;
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  validateForm() {
    const { password, confirmedPassword } = this.state;
    const schema = Joi.object().keys({
      password: Joi.string()
        .required()
        .error(new Error('Password is required.')),
      confirmedPassword: Joi.string()
        .required()
        .valid(password)
        .error(new Error('Passwords must match.')),
    });

    const result = Joi.validate({ password, confirmedPassword }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }

    return !result.error;
  }

  render() {
    const {
      password, confirmedPassword, validationError, loading,
    } = this.state;

    return (
      <Form error={!!validationError} className={style.form} noValidate>
        <Alert className={style.errorMessage} message={validationError} />
        <Form.Field>
          <Label className={style.label}>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </Form.Field>
        <Form.Field>
          <Label className={style.label}>Confirm password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmedPassword}
            onChange={this.handleConfirmedPasswordChange}
          />
        </Form.Field>
        <Button
          loading={loading}
          disabled={loading}
          color="blue"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

ChangePassword.defaultProps = {
  push: null,
};

ChangePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  push: PropTypes.func,
};

export default ChangePassword;
