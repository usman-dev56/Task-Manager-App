import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer bg-dark text-light mt-5">
      <Container>
        <Row className="py-5">
          {/* Company Info */}
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">TaskManager</h5>
            <p className="text-light-50">
              Your ultimate productivity companion. Manage tasks efficiently, 
              stay organized, and boost your productivity with our intuitive 
              task management system.
            </p>
            <div className="social-links mt-3">
              <a href="#" className="text-light me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light-50 text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-light-50 text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-light-50 text-decoration-none">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-light-50 text-decoration-none">
                  Register
                </Link>
              </li>
            </ul>
          </Col>

          {/* Features */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Features</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="text-light-50">Task Management</span>
              </li>
              <li className="mb-2">
                <span className="text-light-50">Priority System</span>
              </li>
              <li className="mb-2">
                <span className="text-light-50">Progress Tracking</span>
              </li>
              <li className="mb-2">
                <span className="text-light-50">Real-time Updates</span>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={4} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled text-light-50">
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                support@taskmanager.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +92***********
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                123 Business Street
              </li>
              <li>
                <i className="bi bi-building me-2"></i>
                Pakistan
              </li>
            </ul>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="border-top pt-4">
          <Col md={6}>
            <p className="text-light-50 mb-0">
              &copy; {currentYear} TaskManager. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="footer-links">
              <a href="#" className="text-light-50 text-decoration-none me-3">
                Privacy Policy
              </a>
              <a href="#" className="text-light-50 text-decoration-none me-3">
                Terms of Service
              </a>
              <a href="#" className="text-light-50 text-decoration-none">
                Cookie Policy
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer