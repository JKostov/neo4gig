
import React, { Component } from 'react';
import {
  Label, Form, Input, Button, Message,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import { Alert } from '../elements';
import forgotPassword from '../../api/forgotPassword';
import style from './style.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validationError: '',
      successMessage: '',
      loading: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { email } = this.state;
    this.setState({ loading: true });

    forgotPassword(email)
      .then(({ data: { message } }) => {
        this.setState({
          successMessage: message,
          loading: false,
        });
      })
      .catch((e) => {
        const { data } = e.response;
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.onSubmit();
    }
  }

  validateForm() {
    const { email } = this.state;
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(new Error('Invalid email format.')),
    });

    const result = Joi.validate({ email }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  render() {
    const {
      email, validationError, loading, successMessage,
    } = this.state;

    const success = successMessage && (
      <Message className={style.message} positive content={successMessage} />
    );

    return (
      <Form
        error={!!validationError}
        className={style.form}
        onSubmit={this.handleSubmit}
        noValidate
      >
        <Alert className={style.message} message={validationError} />
        {success}
        <Form.Field>
          <Label className={style.label}>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleEmailChange}
          />
        </Form.Field>
        <Button loading={loading} disabled={loading} color="blue" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default ForgotPassword;
