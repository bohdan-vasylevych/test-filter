import React, { Component } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';

import './VacancyDetails.scss';

class VacancyDetails extends Component {
  getImages = () => ([
    {
      src: 'https://ugra-tv.ru/upload/iblock/ffa/ffaa6e7b933c0c9f470ff959948193a3.jpg',
      name: 'First slide'
    }, {
      src: 'https://www.acreaty.com/recruiter/img/blog/Information_Technology.jpg',
      name: 'Second slide'
    }, {
      src: 'https://cdn1.itpro.co.uk/sites/itpro/files/images/dir_177/it_photo_88780.jpg',
      name: 'Third slide'
    }
  ]);

  getRandomText = () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


  render() {
    const { users: { currentVacancy: { title, name } } } = this.props;
    const images = this.getImages();

    return (
      <div className="vacancy-details">
        <h3 className="vacancy-details-title">{ title }</h3>
        <div className="vacancy-details-content">
          <Carousel className="vacancy-details-carousel" indicators={false}>
            {images.map(({ src, name }, i) => (
              <Carousel.Item key={`${name}-${i}`}>
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
          <Card>
            <Card.Body className="vacancy-details-box">
              <Card.Title>Vacancy details</Card.Title>
              <Card.Text>Hi. My name is { name } and I'm looking for a { title } {this.getRandomText()}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state, {}
)(VacancyDetails);
