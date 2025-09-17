import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import '../index.css';

const PersonalDetailsStep = ({ formData, updateFormData }) => {
  return (
    <div className="personal-details-step fade-in">
      <h4 className="mb-3 personal-details-title">Step 1: Personal Details</h4>
      <div className="divider" />
      <Form className="personal-details-form">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                required
                className="personal-details-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                required
                className="personal-details-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
                readOnly // Often pre-filled from user context
                className="personal-details-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                required
                className="personal-details-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="idNumber">
              <Form.Label>ID Number <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={formData.idNumber}
                onChange={(e) => updateFormData('idNumber', e.target.value)}
                required
                className="personal-details-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="passportNumber">
              <Form.Label>Passport Number (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={formData.passportNumber}
                onChange={(e) => updateFormData('passportNumber', e.target.value)}
                className="personal-details-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="passportExpiryDate">
              <Form.Label>Passport Expiry Date (Optional)</Form.Label>
              <Form.Control
                type="date"
                value={formData.passportExpiryDate ? moment(formData.passportExpiryDate).format('YYYY-MM-DD') : ''}
                onChange={(e) => updateFormData('passportExpiryDate', e.target.value)}
                className="personal-details-input"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PersonalDetailsStep;
