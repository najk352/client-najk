import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../index.css';

const UploadDocumentsStep = ({ formData, updateFormData }) => {
  const handleFileChange = (e, fieldName) => {
    updateFormData(fieldName, e.target.files[0]);
  };

  return (
    <div className="upload-documents-step fade-in">
      <h4 className="mb-3 upload-documents-title">Step 2: Upload Documents</h4>
      <div className="divider" />
      <p className="text-muted upload-documents-desc">All document uploads are optional, but highly recommended for a complete application. Max file size: 5MB (jpeg, jpg, png, pdf, doc, docx)</p>
      <Form className="upload-documents-form">
        <Form.Group className="mb-3" controlId="passportPhoto">
          <Form.Label>Passport-style Photo (2x2 inches, white background)</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileChange(e, 'passportPhoto')} className="upload-documents-input" />
          {formData.passportPhoto && <span className="text-muted small">Selected: {formData.passportPhoto.name}</span>}
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="idFront">
              <Form.Label>ID Front</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, 'idFront')} className="upload-documents-input" />
              {formData.idFront && <span className="text-muted small">Selected: {formData.idFront.name}</span>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="idBack">
              <Form.Label>ID Back</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, 'idBack')} className="upload-documents-input" />
              {formData.idBack && <span className="text-muted small">Selected: {formData.idBack.name}</span>}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="passportCopy">
          <Form.Label>Passport (Copy)</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileChange(e, 'passportCopy')} className="upload-documents-input" />
          {formData.passportCopy && <span className="text-muted small">Selected: {formData.passportCopy.name}</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="goodConductCertificate">
          <Form.Label>Good Conduct Certificate</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileChange(e, 'goodConductCertificate')} className="upload-documents-input" />
          {formData.goodConductCertificate && <span className="text-muted small">Selected: {formData.goodConductCertificate.name}</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="resume">
          <Form.Label>Resume / CV</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileChange(e, 'resume')} className="upload-documents-input" />
          {formData.resume && <span className="text-muted small">Selected: {formData.resume.name}</span>}
        </Form.Group>
      </Form>
    </div>
  );
};

export default UploadDocumentsStep;
