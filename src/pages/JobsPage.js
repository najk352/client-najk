import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs');
        // Support both { jobs: [...] } and [...] response
        setJobs(Array.isArray(response.data) ? response.data : response.data.jobs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

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
      <h1 className="text-center mb-5">Current Job Openings</h1>
      { !Array.isArray(jobs) || jobs.length === 0 ? (
        <Alert variant="info" className="text-center">No job postings available at the moment.</Alert>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col md={6} lg={4} key={job._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                {job.poster && (
                  <Card.Img
                    variant="top"
                    src={`${api.defaults.baseURL}${job.poster}`}
                    alt={`${job.title} poster`}
                    style={{ height: '180px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.company} - {job.location}</Card.Subtitle>
                  <Card.Text>
                    {job.description.substring(0, 150)}...
                  </Card.Text>
                  <ul className="list-unstyled">
                    <li><strong>Salary:</strong> {job.salary}</li>
                    <li><strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</li>
                  </ul>
                  <Button as={Link} to={`/jobs/${job._id}`} variant="primary">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default JobsPage;