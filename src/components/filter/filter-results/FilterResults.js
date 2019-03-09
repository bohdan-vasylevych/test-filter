import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import Paginator from '../../paginator/Paginator';
import './FilterResults.scss';

class FilterResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: []
    };
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    const { filteredUsers } = this.props;

    return (
      <React.Fragment>
        {this.state.pageOfItems.map(({ name, date, country }, i) => {
          const formattedDate = moment(date).format('DD-MM-YYYY');

          return (
            <Card key={`${name}-${i}`} className="filter-results-card">
              <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ formattedDate }</Card.Subtitle>
                <Card.Text>
                  { country.label } is the country of { name }
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        )}

        <Paginator items={filteredUsers} onChangePage={(pageOfItems) => this.onChangePage(pageOfItems)}/>
      </React.Fragment>
    );
  }
}

FilterResults.propTypes = {
  filteredUsers: PropTypes.array.isRequired
};

export default FilterResults;
