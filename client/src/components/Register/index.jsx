
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Label, Form, Input, Button, Checkbox,
} from 'semantic-ui-react';
import Joi from 'joi-browser'; // eslint-disable import/no-named-as-default
import { Alert } from '../elements';
import { register } from '../../api/auth';
import style from './style.scss';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      instrument: '',
      city: '',
      isMusician: false,
      validationError: null,
      loading: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
    this.handleMusicianChange = this.handleMusicianChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleRegister() {
    const {
      email, password, name, isMusician, city,
    } = this.state;
    let { instrument } = this.state;
    const { push } = this.props;

    if (!isMusician) {
      instrument = null;
    }

    this.setState({ loading: true });
    register({
      name, email, password, isMusician, instrument, city,
    })
      .then(() => push('/login'))
      .catch((e) => {
        const { data } = e.response;
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleInstrumentChange(e) {
    this.setState({ instrument: e.target.value });
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  handleMusicianChange() {
    this.setState(({ isMusician }) => ({ isMusician: !isMusician }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.handleRegister();
    }
  }

  validateForm() {
    const {
      email, password, name, city,
    } = this.state;
    const schema = Joi.object().keys({
      name: Joi.string().required().error(new Error('Name is required.')),
      city: Joi.string().required().error(new Error('City is required.')),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(new Error('Invalid email format.')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required.')),
    });

    const result = Joi.validate({
      email, password, name, city,
    }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  render() {
    const {
      email, password, validationError, loading, name, instrument, isMusician, city,
    } = this.state;

    return (
      <Form
        error={!!validationError}
        className={style.form}
        onSubmit={this.handleSubmit}
        noValidate
      >
        <Alert className={style.errorMessage} message={validationError} />
        <Form.Field>
          <Label className={style.label}>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleNameChange}
          />
        </Form.Field>
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
          <Label className={style.label}>City</Label>
          <Input
            type="input"
            name="city"
            placeholder="City"
            value={city}
            onChange={this.handleCityChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Are you musician ?"
            onChange={this.handleMusicianChange}
          />
        </Form.Field>
        <Form.Field>
          <Label className={style.label}>Instrument</Label>
          <Input
            type="text"
            name="instrument"
            placeholder="Instrument"
            disabled={!isMusician}
            value={instrument}
            onChange={this.handleInstrumentChange}
          />
        </Form.Field>
        <Button
          loading={loading}
          disabled={loading}
          color="blue"
          type="submit"
        >
          Register
        </Button>
      </Form>
    );
  }
}

Register.propTypes = {
  push: PropTypes.func.isRequired,
};

export default Register;
