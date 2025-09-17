import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../utils/api.js'; // This is a pure JS file, no .jsx needed
import { useAuth } from '../context/AuthContext.js'; // Updated import
import moment from 'moment'; // For date formatting

const JobDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/api/jobs/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job details. It might not exist.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading job details...</span>
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

  if (!job) {
    return (
      <Container className="py-5">
        <Alert variant="info">Job not found.</Alert>
      </Container>
    );
  }

  const isJobSeeker = user && user.role === 'job_seeker';

  return (
    <Container className="py-5">
      <Card className="shadow p-4">
        {job.poster && ( // Display poster at the top of the card
          <Card.Img
            variant="top"
            src={`${api.defaults.baseURL}${job.poster}`}
            alt={`${job.title} poster`}
            style={{ maxHeight: '300px', objectFit: 'cover', width: '100%', borderBottom: '1px solid #dee2e6' }}
            className="mb-4"
          />
        )}
        <Card.Body>
          <h1 className="mb-3">{job.title}</h1>
          <h3 className="text-muted mb-4">{job.company} - {job.location}</h3>

          <div className="mb-4">
            <span className="badge bg-primary me-2">Salary: {job.salary}</span>
            <span className="badge bg-info me-2">Posted: {moment(job.createdAt).format('MMM D, YYYY')}</span>
            <span className="badge bg-danger">Deadline: {moment(job.applicationDeadline).format('MMM D, YYYY')}</span>
          </div>

          <h4 className="mt-4">Description</h4>
          <p>{job.description}</p>

          <h4 className="mt-4">Requirements</h4>
          <p>{job.requirements}</p>

          <div className="d-flex justify-content-between mt-5">
            {isJobSeeker ? (
              <Button as={Link} to={`/apply/${job._id}`} variant="success" size="lg">
                Apply Now
              </Button>
            ) : (
              <Alert variant="info" className="mb-0">
                Please <Link to="/login">login</Link> as a job seeker to apply.
              </Alert>
            )}
            <Button as={Link} to="/jobs" variant="outline-secondary">
              Back to Jobs
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetailPage;