
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import {
  Label, Form, Button, Input, FormField,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import {
  Alert, Modal,
} from '../elements';
import style from './style.scss';

class CreateEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      dateAndTime: '',
      validationError: null,
      loading: false,
    };

    this.modalRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDateAndTimeChange = this.handleDateAndTimeChange.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  getModalActionsAndChildren() {
    const {
      validationError, loading, city, dateAndTime,
    } = this.state;
    return {
      children: (
        <Form
          className={style.form}
          error={!!validationError}
          onSubmit={this.handleSubmit}
          noValidate
        >
          <Alert message={validationError} />
          <FormField>
            <Label className={style.label}>City</Label>
            <Input
              name="city"
              value={city}
              onChange={this.handleCityChange}
              placeholder="City"
            />
          </FormField>
          <FormField>
            <Label className={style.label}>Date and time</Label>
            <Input
              name="dateAndTime"
              value={dateAndTime}
              onChange={this.handleDateAndTimeChange}
              placeholder="04 Dec 1995 00:12:00 GMT"
            />
          </FormField>
          <Button loading={loading} disabled={loading} color="purple" type="submit">
            Create event
          </Button>
        </Form>
      ),
    };
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  handleDateAndTimeChange(e) {
    this.setState({ dateAndTime: e.target.value });
  }

  createEvent() {
    const { createEventAction, id, neoId } = this.props;
    const { city, dateAndTime } = this.state;

    const createdDateTime = moment(Date.parse(dateAndTime)).format();

    console.log(createdDateTime);

    this.setState({ loading: true });
    createEventAction(id, neoId, { city, dateAndTime: createdDateTime })
      .then(() => this.handleModalClose())
      .catch(({ response: { data } }) => {
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  validateForm() {
    const { city, dateAndTime } = this.state;
    const schema = Joi.object().keys({
      city: Joi.string()
        .required()
        .error(new Error('Invalid city format.')),
      dateAndTime: Joi.string()
        .required()
        .error(new Error('Invalid dateAndTime format.')),
    });

    const result = Joi.validate({ city, dateAndTime }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.createEvent();
    }
  }

  open() {
    this.modalRef.current.open();
  }

  handleModalClose() {
    this.setState({
      city: '',
      dateAndTime: '',
      validationError: null,
      loading: false,
    });
    this.modalRef.current.close();
  }


  handleEnter(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  render() {
    const { actions, children } = this.getModalActionsAndChildren();
    return (
      <Modal ref={this.modalRef} title="Create event" actions={actions}>
        {children}
      </Modal>
    );
  }
}

CreateEventModal.propTypes = {
  createEventAction: PropTypes.func.isRequired,
  neoId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
export default CreateEventModal;
