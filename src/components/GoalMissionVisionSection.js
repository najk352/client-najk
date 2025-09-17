import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Keep imports, they are used below

const GoalMissionVisionSection = () => {
  return (
    <div className="py-5 bg-light">
      <Container>
        <Row className="text-center"> {/* Row IS used */}
          <Col md={4} className="mb-4"> {/* Col IS used */}
            <Card className="h-100 shadow-sm"> {/* Card IS used */}
              <Card.Body>
                <Card.Title>Our Goal</Card.Title>
                <Card.Text>
                  Helping clients succeed abroad with confidence and dignity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Our Mission</Card.Title>
                <Card.Text>
                  Deliver ethical, transparent, and effective recruitment solutions globally.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Our Vision</Card.Title>
                <Card.Text>
                  Strategic solutions for a connected world.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GoalMissionVisionSection;