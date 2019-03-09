import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as reducer from '../reducers/users';
import Filter from '../components/filter/Filter';
import './Home.scss';

class Home extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <div className="home">
        <Filter />
      </div>
    );
  }
}

Home.propTypes = {
    loadUsers: PropTypes.func.isRequired
};

export default connect(
  state => state,
  dispatch => ({
    loadUsers: () => {dispatch(reducer.onUsersFetch())}
  })
)(Home);
