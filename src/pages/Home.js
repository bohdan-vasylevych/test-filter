import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as reducer from '../reducers/users';
import Filter from '../components/filter/Filter';
import './Home.scss';
import VacancyDetails from './VacancyDetails';

class Home extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { currentVacancy } = this.props;

    return (
      <div className="home">
        {!currentVacancy && <Filter />}
        {currentVacancy && <VacancyDetails />}
      </div>
    );
  }
}

Home.propTypes = {
    loadUsers: PropTypes.func.isRequired
};

export default connect(
  ({ users: { currentVacancy } }) => ({ currentVacancy }),
  dispatch => ({
    loadUsers: () => {dispatch(reducer.onUsersFetch())}
  })
)(Home);
