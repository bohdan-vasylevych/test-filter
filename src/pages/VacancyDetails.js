import React, { Component } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import './VacancyDetails.scss';

class VacancyDetails extends Component {
  getImages = () => ([
    {
      src: 'https://www.acreaty.com/recruiter/img/blog/Information_Technology.jpg',
      name: 'First slide'
    }, {
      src: 'https://www.acreaty.com/recruiter/img/blog/Information_Technology.jpg',
      name: 'Second slide'
    }, {
      src: 'https://www.acreaty.com/recruiter/img/blog/Information_Technology.jpg',
      name: 'Third slide'
    }
  ]);

  getRandomText = () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


  render() {
    debugger
    const { users: { currentVacancy: { title, name } } } = this.props;
    const images = this.getImages();

    return (
      <Row>
        <Col md={8}>
          <Carousel className="vacancy-carousel" indicators={false}>
            {images.map(({ src, name }) => (
              <Carousel.Item>
                <img
                  className="vacancy-img d-block w-100"
                  src={src}
                  alt={name}
                />
                <Carousel.Caption>
                  <h3>{ name }</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{ title }</Card.Title>
              <Card.Text>Hi. My name is { name } and I'm looking for a { title } {this.getRandomText()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(
  state => state, {}
)(VacancyDetails);
