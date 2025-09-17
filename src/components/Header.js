import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext.js'; // Updated import
import najahLogo from '../assets/najah_logo.png'; // Import your logo

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Nav.Link className="navbar-brand"> {/* Use Nav.Link as the child, and apply navbar-brand class */}
            <img
              alt="Najah Global Hub Consultancy Logo"
              src={najahLogo}
              height="30"
              className="d-inline-block align-top me-2"
            />
            NAJAH GLOBAL HUB CONSULTANCY
          </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/about"><Nav.Link>About Us</Nav.Link></LinkContainer>
            <LinkContainer to="/partners"><Nav.Link>Partners</Nav.Link></LinkContainer>
            <LinkContainer to="/jobs"><Nav.Link>Jobs</Nav.Link></LinkContainer>
            <LinkContainer to="/services"><Nav.Link>Services</Nav.Link></LinkContainer>
            <LinkContainer to="/contact"><Nav.Link>Contact Us</Nav.Link></LinkContainer>
          </Nav>
          <Nav>
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <LinkContainer to="/admin">
                    <Nav.Link>Admin Dashboard</Nav.Link>
                  </LinkContainer>
                ) : (
                  <>
                    {/* Changed to /jobs as per previous discussion */}
                    <LinkContainer to="/jobs">
                      <Button variant="outline-light" className="me-2">Browse Jobs to Apply</Button>
                    </LinkContainer>
                    <LinkContainer to="/track-application">
                      <Button variant="outline-light">Track Application</Button>
                    </LinkContainer>
                  </>
                )}
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                {/* Changed to /jobs as per previous discussion */}
                <LinkContainer to="/jobs">
                  <Button variant="outline-light" className="ms-2">Apply Now (Browse Jobs)</Button>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;