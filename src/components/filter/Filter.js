import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FilterControls from './filter-controls/FilterControls';
import FilterResults from './filter-results/FilterResults';

import './Filter.scss';

class Filter extends Component {
  render() {
    const { filteredUsers, loading, error } = this.props;

    if (error) {
      return <div>{ error }</div>;
    }

    return (
      <div className="filter">
        <div>
          <FilterControls  />
        </div>

        <div>
          {!loading && !filteredUsers.length && <div>No users match applied filters</div>}
          {!loading && !!filteredUsers.length && <FilterResults filteredUsers={filteredUsers} />}
        </div>
      </div>
    );
  }
}

FilterResults.propTypes = {
  filteredUsers: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

FilterResults.defaultProps = {
  loading: false,
  error: null
};

export default connect(
  ({ users : { filteredUsers, loading, error } }) => ({ filteredUsers, loading, error })
)(Filter);
