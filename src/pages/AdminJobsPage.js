import React, { useEffect, useState, useCallback } from 'react';
import { Container, Button, Form, Spinner, Alert, Table, Modal, Image } from 'react-bootstrap';
import api from '../utils/api.js';
import { useAuth } from '../context/AuthContext.js';
import moment from 'moment';

const AdminJobsPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [posterFile, setPosterFile] = useState(null);
  const [currentPosterUrl, setCurrentPosterUrl] = useState('');

  // Memoize fetchJobs to satisfy useEffect dependency
  const fetchJobs = useCallback(async () => {
    if (!user || user.role !== 'admin') {
      setError('Not authorized as an admin.');
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('/api/jobs');
      setJobs(Array.isArray(response.data) ? response.data : response.data.jobs);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs.');
      setLoading(false);
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleShowModal = (job = null) => {
    setEditingJob(job);
    if (job) {
      setTitle(job.title);
      setCompany(job.company);
      setLocation(job.location);
      setDescription(job.description);
      setRequirements(job.requirements);
      setSalary(job.salary);
      setApplicationDeadline(moment(job.applicationDeadline).format('YYYY-MM-DD'));
      setCurrentPosterUrl(job.poster ? `${api.defaults.baseURL}${job.poster}` : '');
    } else {
      setTitle('');
      setCompany('');
      setLocation('');
      setDescription('');
      setRequirements('');
      setSalary('');
      setApplicationDeadline('');
      setCurrentPosterUrl('');
    }
    setPosterFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setError(null);
    setPosterFile(null);
    setCurrentPosterUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('company', company);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('requirements', requirements);
    formData.append('salary', salary);
    formData.append('applicationDeadline', applicationDeadline);
    if (posterFile) {
      formData.append('poster', posterFile);
    }

    try {
      if (editingJob) {
        await api.put(`/api/admin/jobs/${editingJob._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Job updated successfully!');
      } else {
        await api.post('/api/admin/jobs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Job created successfully!');
      }
      handleCloseModal();
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save job.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/api/admin/jobs/${jobId}`);
        alert('Job deleted successfully!');
        fetchJobs();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete job.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading jobs...</span>
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
      <h1 className="text-center mb-5">Job Management</h1>
      <Button variant="primary" onClick={() => handleShowModal()} className="mb-4">
        Post New Job
      </Button>
      { !Array.isArray(jobs) || jobs.length === 0 ? (
        <Alert variant="info" className="text-center">No job postings available.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>
                  {job.poster && (
                    <Image
                      src={`${api.defaults.baseURL}${job.poster}`}
                      alt={job.title}
                      thumbnail
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{moment(job.applicationDeadline).format('MMM D, YYYY')}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(job)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteJob(job._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingJob ? 'Edit Job Posting' : 'Post New Job'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Requirements</Form.Label>
              <Form.Control as="textarea" rows={5} value={requirements} onChange={(e) => setRequirements(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control type="date" value={applicationDeadline} onChange={(e) => setApplicationDeadline(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Job Poster (Image)</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={(e) => setPosterFile(e.target.files[0])}
              />
              {currentPosterUrl && !posterFile && (
                <div className="mt-2">
                  <h6>Current Poster:</h6>
                  <Image
                    src={currentPosterUrl}
                    alt="Current Job Poster"
                    thumbnail
                    style={{ maxHeight: '150px' }}
                  />
                  <p className="text-muted small">Upload a new file to replace it.</p>
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : (editingJob ? 'Update Job' : 'Post Job')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminJobsPage;