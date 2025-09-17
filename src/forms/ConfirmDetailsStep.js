import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import '../index.css';

const ConfirmDetailsStep = ({ formData }) => {
  const renderFilePreview = (file) => {
    if (!file) return 'No file uploaded';
    return file.name;
  };

  return (
    <div className="confirm-details-step fade-in">
      <h4 className="mb-3 confirm-details-title">Step 3: Confirm Details</h4>
      <div className="divider" />
      <p className="text-muted confirm-details-desc">Please review all your details and uploaded documents before submitting your application.</p>
      <Card className="mb-4 confirm-details-card card-hover">
        <Card.Header>Personal Details</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>First Name:</strong> {formData.firstName}</ListGroup.Item>
          <ListGroup.Item><strong>Last Name:</strong> {formData.lastName}</ListGroup.Item>
          <ListGroup.Item><strong>Email:</strong> {formData.email}</ListGroup.Item>
          <ListGroup.Item><strong>Phone Number:</strong> {formData.phoneNumber}</ListGroup.Item>
          <ListGroup.Item><strong>ID Number:</strong> {formData.idNumber}</ListGroup.Item>
          {formData.passportNumber && <ListGroup.Item><strong>Passport Number:</strong> {formData.passportNumber}</ListGroup.Item>}
          {formData.passportExpiryDate && <ListGroup.Item><strong>Passport Expiry Date:</strong> {moment(formData.passportExpiryDate).format('YYYY-MM-DD')}</ListGroup.Item>}
        </ListGroup>
      </Card>
      <Card className="confirm-details-card card-hover">
        <Card.Header>Uploaded Documents</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Passport Photo:</strong> {renderFilePreview(formData.passportPhoto)}</ListGroup.Item>
          <ListGroup.Item><strong>ID Front:</strong> {renderFilePreview(formData.idFront)}</ListGroup.Item>
          <ListGroup.Item><strong>ID Back:</strong> {renderFilePreview(formData.idBack)}</ListGroup.Item>
          <ListGroup.Item><strong>Passport Copy:</strong> {renderFilePreview(formData.passportCopy)}</ListGroup.Item>
          <ListGroup.Item><strong>Good Conduct Certificate:</strong> {renderFilePreview(formData.goodConductCertificate)}</ListGroup.Item>
          <ListGroup.Item><strong>Resume / CV:</strong> {renderFilePreview(formData.resume)}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default ConfirmDetailsStep;
