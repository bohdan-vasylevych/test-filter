import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import FilterControls from './filter-controls/FilterControls';
import FilterResults from './filter-results/FilterResults';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDefaultGrid: true
    }
  }

  changeGrid = () => {
    this.setState({ isDefaultGrid: !this.state.isDefaultGrid });
  };

  render() {
    const { filteredUsers, loading, error } = this.props;
    const { isDefaultGrid } = this.state;

    return (
      <Row>
        {isDefaultGrid && <Col lg={4}>
          <FilterControls changeGrid={this.changeGrid} />
        </Col>}

        <Col lg={8}>
          {loading && <div>Loading...</div>}
          {error && <div>{ error }</div>}
          {!loading && !error && !filteredUsers.length && <div>No users match applied filters</div>}
          {!loading && !error && !!filteredUsers.length && <FilterResults filteredUsers={filteredUsers} />}
        </Col>

        {!isDefaultGrid && <Col lg={4}>
          <FilterControls changeGrid={this.changeGrid} />
        </Col>}
      </Row>
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
