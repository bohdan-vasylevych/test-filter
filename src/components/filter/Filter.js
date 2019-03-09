import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import FilterControls from './filter-controls/FilterControls';
import FilterResults from './filter-results/FilterResults';

class Filter extends Component {
  render() {
    const { filteredUsers, loading, error } = this.props;

    return (
      <Container>
        <Row>
          <Col lg={4}>
            <FilterControls />
          </Col>

          <Col lg={8}>
            {loading && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {!loading && !error && !filteredUsers.length && <div>No users match applied filters</div>}
            {!loading && !error && !!filteredUsers.length && <FilterResults filteredUsers={filteredUsers} />}
          </Col>
        </Row>
      </Container>
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
