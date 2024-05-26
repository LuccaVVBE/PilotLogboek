import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


const Statistic = ({ stat, index }) => {
    const names = ['Flights this month', 'Flights this year', 'Total flights'];
  return (
    
    
      <Card className="statistic">
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{names[index]}</Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>{stat}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
  );
};

export default Statistic;
