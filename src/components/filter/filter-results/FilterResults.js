import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import moment from 'moment';

import Paginator from '../../paginator/Paginator';
import './FilterResults.scss';
import { connect } from 'react-redux';
import * as reducer from '../../../reducers/users';

class FilterResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: []
    };
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems: pageOfItems });
  };

  showCurrentVacancy = (name) => {
    this.props.loadCurrentVacancy(name);
  };

  render() {
    const { filteredUsers } = this.props;

    return (
      <div className="filter-results">
        {this.state.pageOfItems.map(({ name, title, date, country }, i) => {
          const formattedDate = moment(date).format('DD-MM-YYYY');

          return (
              <Card key={`${name}-${i}`} className="filter-results-card">
                <Card.Body>
                  <Card.Title>{ title }</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{ `${ country.label }, ${ formattedDate }` }</Card.Subtitle>
                  <Card.Text>Hi. My name is { name } and I'm looking for a { title }</Card.Text>
                  <Button variant="primary" onClick={() => this.showCurrentVacancy(name)}>Read more</Button>
                </Card.Body>
              </Card>
          )}
        )}

        <Paginator items={filteredUsers} onChangePage={(pageOfItems) => this.onChangePage(pageOfItems)}/>
      </div>
    );
  }
}

FilterResults.propTypes = {
  filteredUsers: PropTypes.array.isRequired
};

export default connect(
  state => state,
  dispatch => ({
    loadCurrentVacancy: (id) => {dispatch(reducer.onCurrentVacancyFetch(id))}
  })
)(FilterResults);
