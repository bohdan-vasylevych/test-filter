import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as reducer from '../../../reducers/users';
import './FilterControls.scss';

class FilterControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: '',
      selectedCountry: '',
      selectedDate: null
    }
  }

  handleInputChange = ({ target: { name, value }}) => {
    this.applySelectedFilter({ [name]: value });
  };

  handleDateChange = (selectedDate) => {
    this.applySelectedFilter({ selectedDate });
  };

  applySelectedFilter = (filter) => {
    this.setState(filter);
    this.filterUsers(filter);
  };

  checkName = (name, selectedName) => name.toLowerCase().indexOf(selectedName.toLowerCase()) !== -1;

  checkCountry = ({ value }, selectedCountry) => value.indexOf(selectedCountry) !== -1;

  checkDate = (date, selectedDate) => {
    const formattedUserDate = moment(date).format('DD-MM-YYYY');
    const formattedSelectedDate = selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : '';
    return formattedUserDate.indexOf(formattedSelectedDate) !== -1;
  };

  clearDate = () => {
    this.applySelectedFilter({ selectedDate: null });
  };

  filterUsers = ({
    selectedName = this.state.selectedName,
    selectedCountry = this.state.selectedCountry,
    selectedDate = this.state.selectedDate
  }) => {
    const { data } = this.props;

    const filteredUsers = data.filter(({ name, country, date }) => (
      this.checkName(name, selectedName) &&
      this.checkDate(date, selectedDate) &&
      this.checkCountry(country, selectedCountry)
    ));

    this.props.updateFilteredUsers(filteredUsers);
  };

  getCountryList = (data) => {
    const list = [];

    data.forEach(({ country }) => {
      const isIncluded = list.find(({ value }) => value === country.value);
      if (!isIncluded) {
        list.push(country)
      }
    });

    return list;
  };

  render() {
    const { data } = this.props;
    const countries = data.length ? this.getCountryList(data) : [];

    return (
      <Form>
        <h2>Filter by</h2>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="selectedName"
            value={this.state.selectedName}
            onChange={(e) => this.handleInputChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            placeholder="Country"
            name="selectedCountry"
            value={this.state.selectedCountry}
            onChange={(e) => this.handleInputChange(e)}
            disabled={!countries.length}
          >
            <option value="">Select a country</option>
            {countries.map(({ value, label }) => <option value={value} key={value}>{ label }</option>)}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <div className="filter-controls-datepicker">
            <DatePicker
              selected={this.state.selectedDate}
              onChange={(date) =>this.handleDateChange(date)}
              placeholderText="Select a date..."
              dropdownMode="select"
            />
            <Button variant="primary" size="sm" onClick={() => this.clearDate()}>Clear date</Button>
          </div>
        </Form.Group>
      </Form>
    );
  }
}

FilterControls.propTypes = {
  data: PropTypes.array.isRequired,
  updateFilteredUsers: PropTypes.func.isRequired
};

export default connect(
  ({ users: { data } }) => ({ data }),
  dispatch => ({
    updateFilteredUsers: (users) => {dispatch(reducer.onFilterUsers(users))}
  })
)(FilterControls);
