import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import api from '../utils/api.js';
import { useAuth } from '../context/AuthContext.js';
import moment from 'moment';

const AdminContactMessagesPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isRead, setIsRead] = useState(false); // For modal form

  const fetchMessages = React.useCallback(async () => {
    if (!user || user.role !== 'admin') {
      setError('Not authorized as an admin.');
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('/api/contact/admin/contact-messages'); // Corrected API endpoint for fetching messages
      setMessages(Array.isArray(response.data) ? response.data : response.data.data); // Adjust based on actual API response format
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contact messages.');
      setLoading(false);
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleShowDetailModal = (message) => {
    setSelectedMessage(message);
    setIsRead(message.read);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedMessage(null);
    setError(null);
  };

  const handleUpdateReadStatus = async () => {
    if (!selectedMessage) return;
    setLoading(true);
    setError(null);
    try {
      await api.put(`/api/contact/admin/contact-messages/${selectedMessage._id}/read`, { read: isRead }); // Corrected API endpoint for updating status
      alert('Message read status updated!');
      handleCloseDetailModal();
      fetchMessages(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update message status.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading messages...</span>
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
      <h1 className="text-center mb-5">Contact Messages</h1>
      {(!Array.isArray(messages) || messages.length === 0) ? (
        <Alert variant="info" className="text-center">No contact messages received yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Received On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.subject}</td>
                <td>{moment(message.createdAt).format('MMM D, YYYY h:mm A')}</td>
                <td>
                  <Badge bg={message.read ? 'success' : 'secondary'}>
                    {message.read ? 'Read' : 'Unread'}
                  </Badge>
                </td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowDetailModal(message)}>View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Message Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <>
              <h5>From: {selectedMessage.name} ({selectedMessage.email})</h5>
              <p><strong>Subject:</strong> {selectedMessage.subject}</p>
              <p><strong>Received:</strong> {moment(selectedMessage.createdAt).format('MMM D, YYYY h:mm A')}</p>
              <hr />
              <h6>Message:</h6>
              <p>{selectedMessage.message}</p>
              <hr />
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Mark as Read"
                  checked={isRead}
                  onChange={(e) => setIsRead(e.target.checked)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdateReadStatus} disabled={loading}>
                {loading ? 'Updating...' : 'Update Status'}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminContactMessagesPage;