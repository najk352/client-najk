import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, ListGroup, Button } from 'react-bootstrap';
import api from '../utils/api.js'; // This is a pure JS file, no .jsx needed
import { useAuth } from '../context/AuthContext.js'; // Updated import
import moment from 'moment';

const TrackApplicationPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (user && user.role === 'job_seeker') {
        try {
          const response = await api.get('/api/applications/my-applications');
         // Assuming API response for my-applications might also be an object { applications: [...] }
// If it's just an array, response.data.applications will be undefined, so fallback
setApplications(Array.isArray(response.data) ? response.data : response.data.applications);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch applications.');
          setLoading(false);
          console.error(err);
        }
      } else {
        setError('Please login as a job seeker to track applications.');
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleViewDetails = async (appId) => {
    try {
      const response = await api.get(`/api/applications/${appId}`);
      setSelectedApplication(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch application details.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading applications...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">My Job Applications</h1>
      {(!Array.isArray(applications) || applications.length === 0) ? (
        <Alert variant="info" className="text-center">You have not submitted any applications yet.</Alert>
      ) : (
        <Row>
          <Col md={selectedApplication ? 6 : 12}>
            <Card className="shadow p-4">
              <Card.Header>Your Submitted Applications</Card.Header>
              <ListGroup variant="flush">
                {applications.map((app) => (
                  <ListGroup.Item key={app._id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{app.job.title} at {app.job.company}</h5>
                      <p className="mb-0 text-muted">Applied on: {moment(app.createdAt).format('MMM D, YYYY')}</p>
                      <span className={`badge bg-${
                        app.status === 'accepted' ? 'success' :
                        app.status === 'rejected' ? 'danger' :
                        app.status === 'interview' ? 'primary' :
                        'secondary'
                      }`}>{app.status.toUpperCase()}</span>
                    </div>
                    <Button variant="info" size="sm" onClick={() => handleViewDetails(app._id)}>View Details</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          {selectedApplication && (
            <Col md={6}>
              <Card className="shadow p-4 mt-4 mt-md-0">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  Application Details
                  <Button variant="outline-secondary" size="sm" onClick={() => setSelectedApplication(null)}>Close</Button>
                </Card.Header>
                <Card.Body>
                  <h5>Job: {selectedApplication.job.title} at {selectedApplication.job.company}</h5>
                  <p><strong>Status:</strong> <span className={`badge bg-${
                        selectedApplication.status === 'accepted' ? 'success' :
                        selectedApplication.status === 'rejected' ? 'danger' :
                        selectedApplication.status === 'interview' ? 'primary' :
                        'secondary'
                      }`}>{selectedApplication.status.toUpperCase()}</span></p>
                  <p><strong>Applied Date:</strong> {moment(selectedApplication.createdAt).format('MMM D, YYYY h:mm A')}</p>
                  <hr />
                  <h6>Personal Details:</h6>
                  <p><strong>Name:</strong> {selectedApplication.firstName} {selectedApplication.lastName}</p>
                  <p><strong>Email:</strong> {selectedApplication.email}</p>
                  <p><strong>Phone:</strong> {selectedApplication.phoneNumber}</p>
                  <p><strong>ID Number:</strong> {selectedApplication.idNumber}</p>
                  {selectedApplication.passportNumber && <p><strong>Passport Number:</strong> {selectedApplication.passportNumber}</p>}
                  {selectedApplication.passportExpiryDate && <p><strong>Passport Expiry:</strong> {moment(selectedApplication.passportExpiryDate).format('MMM D, YYYY')}</p>}
                  <hr />
                  <h6>Uploaded Documents:</h6>
                  {selectedApplication.resume && <p><a href={selectedApplication.resume} target="_blank" rel="noopener noreferrer">Resume</a></p>}
                  {selectedApplication.passportPhoto && <p><a href={selectedApplication.passportPhoto} target="_blank" rel="noopener noreferrer">Passport Photo</a></p>}
                  {selectedApplication.idFront && <p><a href={selectedApplication.idFront} target="_blank" rel="noopener noreferrer">ID Front</a></p>}
                  {selectedApplication.idBack && <p><a href={selectedApplication.idBack} target="_blank" rel="noopener noreferrer">ID Back</a></p>}
                  {selectedApplication.passportCopy && <p><a href={selectedApplication.passportCopy} target="_blank" rel="noopener noreferrer">Passport Copy</a></p>}
                  {selectedApplication.goodConductCertificate && <p><a href={selectedApplication.goodConductCertificate} target="_blank" rel="noopener noreferrer">Good Conduct Certificate</a></p>}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default TrackApplicationPage;