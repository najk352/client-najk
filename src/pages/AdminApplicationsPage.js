import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import api from '../utils/api.js'; // This is a pure JS file, no .jsx needed
import { useAuth } from '../context/AuthContext.js'; // Updated import
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import path from 'path-browserify';


const AdminApplicationsPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const statusOptions = ['pending', 'reviewed', 'interview', 'rejected', 'accepted', 'withdrawn'];

  // --- Handler functions ---
  const fetchApplications = React.useCallback(async () => {
    if (!user || user.role !== 'admin') {
      setError('Not authorized as an admin.');
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('/api/admin/applications');
      setApplications(Array.isArray(response.data) ? response.data : response.data.applications);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch applications.');
      setLoading(false);
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleShowDetailModal = async (appId) => {
    try {
      const response = await api.get(`/api/admin/applications/${appId}`);
      setSelectedApplication(response.data);
      setNewStatus(response.data.status);
      setAdminNotes(response.data.adminNotes || '');
      setShowDetailModal(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch application details.');
      console.error(err);
    }
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedApplication(null);
    setError(null);
  };

  const handleUpdateStatus = async () => {
    if (!selectedApplication) return;
    setLoading(true);
    setError(null);
    try {
      await api.put(`/api/admin/applications/${selectedApplication._id}/status`, { status: newStatus, adminNotes });
      alert('Application status updated!');
      handleCloseDetailModal();
      fetchApplications(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDocument = async (documentType) => {
    if (!selectedApplication || !selectedApplication[documentType]) {
        alert('Document not available.');
        return;
    }
    setLoading(true);
    try {
        const response = await api.get(`/api/admin/applications/${selectedApplication._id}/download/${documentType}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const originalFilePath = selectedApplication[documentType];
        const suggestedFileName = path.basename(originalFilePath);
        link.setAttribute('download', suggestedFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Failed to download document:', err);
        const errorMessage = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Failed to download document. Please try again.';
        alert(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  // --- Render logic ---
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
      <h1 className="text-center mb-5">All Job Applications</h1>
      {(!Array.isArray(applications) || applications.length === 0) ? (
        <Alert variant="info" className="text-center">No applications submitted yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.firstName} {app.lastName} ({app.applicant.email})</td>
                <td>{app.job.title}</td>
                <td>{app.job.company}</td>
                <td>{moment(app.createdAt).format('MMM D, YYYY')}</td>
                <td><Badge bg={
                    app.status === 'accepted' ? 'success' :
                    app.status === 'rejected' ? 'danger' :
                    app.status === 'interview' ? 'primary' :
                    'secondary'
                }>{app.status.toUpperCase()}</Badge></td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowDetailModal(app._id)}>View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Application Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <>
              <h5>Job: {selectedApplication.job.title} at {selectedApplication.job.company}</h5>
              <p><strong>Applicant:</strong> {selectedApplication.firstName} {selectedApplication.lastName} ({selectedApplication.applicant.email})</p>
              <p><strong>Status:</strong> <Badge bg={
                    selectedApplication.status === 'accepted' ? 'success' :
                    selectedApplication.status === 'rejected' ? 'danger' :
                    selectedApplication.status === 'interview' ? 'primary' :
                    'secondary'
                }>{selectedApplication.status.toUpperCase()}</Badge></p>
              <p><strong>Applied On:</strong> {moment(selectedApplication.createdAt).format('MMM D, YYYY h:mm A')}</p>
              <hr />
              <h6>Personal Details:</h6>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Phone:</strong> {selectedApplication.phoneNumber}</p>
              <p><strong>ID Number:</strong> {selectedApplication.idNumber}</p>
              {selectedApplication.passportNumber && <p><strong>Passport Number:</strong> {selectedApplication.passportNumber}</p>}
              {selectedApplication.passportExpiryDate && <p><strong>Passport Expiry:</strong> {moment(selectedApplication.passportExpiryDate).format('MMM D, YYYY')}</p>}
              <hr />
              <h6>Uploaded Documents:</h6>
              {selectedApplication.resume && <Button variant="link" onClick={() => handleDownloadDocument('resume')}>Download Resume</Button>}
              {selectedApplication.passportPhoto && <Button variant="link" onClick={() => handleDownloadDocument('passportPhoto')}>Download Passport Photo</Button>}
              {selectedApplication.idFront && <Button variant="link" onClick={() => handleDownloadDocument('idFront')}>Download ID Front</Button>}
              {selectedApplication.idBack && <Button variant="link" onClick={() => handleDownloadDocument('idBack')}>Download ID Back</Button>}
              {selectedApplication.passportCopy && <Button variant="link" onClick={() => handleDownloadDocument('passportCopy')}>Download Passport</Button>}
              {selectedApplication.goodConductCertificate && <Button variant="link" onClick={() => handleDownloadDocument('goodConductCertificate')}>Download Good Conduct Cert</Button>}
              <hr />
              <h6>Admin Notes:</h6>
              <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={3} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} />
              </Form.Group>
              <h6>Update Status:</h6>
              <Form.Group className="mb-3">
                <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="primary" onClick={handleUpdateStatus} disabled={loading}>
                {loading ? 'Updating...' : 'Update Status'}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminApplicationsPage;