import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Alert, Spinner } from 'react-bootstrap';
import PersonalDetailsStep from './PersonalDetailsStep';
import UploadDocumentsStep from './UploadDocumentsStep';
import ConfirmDetailsStep from './ConfirmDetailsStep';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Assuming you create this util
import { useAuth } from '../context/AuthContext';


const ApplicationWizard = () => {
  const { jobId } = useParams(); // Optional: Job ID might be passed from a job detail page
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '', // Pre-fill email if logged in
    phoneNumber: '',
    idNumber: '',
    passportNumber: '',
    passportExpiryDate: '',

    passportPhoto: null,
    idFront: null,
    idBack: null,
    passportCopy: null,
    goodConductCertificate: null,
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Ensure a jobId is present for the application process
    if (!jobId) {
        setError('No job selected for application. Please select a job from the "Jobs" page.');
        // Optionally redirect after a short delay
        setTimeout(() => {
            navigate('/jobs'); // Redirect to jobs list if no jobId is provided
        }, 3000);
    }
    // Also ensure user is a job seeker if not already handled by route
    if (user && user.role !== 'job_seeker') {
        setError('Only job seekers can apply for jobs. Redirecting to home.');
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }
}, [jobId, navigate, user]); // Added user to dependency array

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Basic validation before moving to next step
    setError(null);
    if (currentStep === 1) {
      const { firstName, lastName, email, phoneNumber, idNumber } = formData;
      if (!firstName || !lastName || !email || !phoneNumber || !idNumber) {
        setError('Please fill all required personal details before proceeding.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    // Append text fields
    for (const key in formData) {
      if (formData[key] instanceof File) {
        // Handle files separately
        data.append(key, formData[key]);
      } else if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }
    
    // Ensure email is always taken from user context if available, or form if not
    // data.set('email', user?.email || formData.email);


    try {
      await api.post(`/api/applications/${jobId}`, data, { // Removed 'const response ='
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
      setSuccess('Application submitted successfully!');
      // Optionally clear form or redirect
      setFormData({
        firstName: '', lastName: '', email: user?.email || '', phoneNumber: '', idNumber: '',
        passportNumber: '', passportExpiryDate: '',
        passportPhoto: null, idFront: null, idBack: null, passportCopy: null,
        goodConductCertificate: null, resume: null,
      });
      setCurrentStep(1); // Reset to first step
      navigate('/track-application'); // Redirect to track application page
    } catch (err) {
      setError(err.response?.data?.message || 'Application submission failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <UploadDocumentsStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <ConfirmDetailsStep formData={formData} />;
      default:
        return <PersonalDetailsStep formData={formData} updateFormData={updateFormData} />;
    }
  };

  if (!user || user.role !== 'job_seeker') {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          You must be logged in as a job seeker to apply for jobs. Please <Link to="/login">login</Link> or <Link to="/register">register</Link>.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow application-wizard">
        <Card.Header className="text-center">
          <h3>Job Application Wizard</h3>
          <ProgressBar now={(currentStep / 3) * 100} label={`Step ${currentStep} of 3`} className="mt-3" />
          <div className="step-indicator mt-3">
            <span className={currentStep === 1 ? 'active' : ''}>1. Personal Details</span>
            <span className={currentStep === 2 ? 'active' : ''}>2. Upload Documents</span>
            <span className={currentStep === 3 ? 'active' : ''}>3. Confirm Details</span>
          </div>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          {getStepContent()}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          {currentStep > 1 && (
            <Button variant="secondary" onClick={prevStep} disabled={loading}>
              Previous
            </Button>
          )}
          {currentStep < 3 && (
            <Button variant="primary" onClick={nextStep} disabled={loading} className="ms-auto">
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button variant="success" onClick={handleSubmit} disabled={loading} className="ms-auto">
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit Application'}
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ApplicationWizard;