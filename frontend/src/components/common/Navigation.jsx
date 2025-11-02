import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import { useState, useEffect } from 'react'


function Navigation() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in when component mounts
    const user = authService.getCurrentUser()
    setCurrentUser(user)
  }, [])

  const handleLogout = () => {
    authService.logout()
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-navbar py-1">
      <Container fluid className="px-4">
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-3">
          TaskManager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              className={({ isActive }) => 
                `fw-semibold px-3 nav-link-custom ${isActive ? 'active' : ''}`
              }
            >
              Home
            </Nav.Link>

            {currentUser ? (
              // Show when user is logged in
              <>
                <Nav.Link 
                  as={NavLink} 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `fw-semibold px-3 nav-link-custom ${isActive ? 'active' : ''}`
                  }
                >
                  Dashboard
                </Nav.Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm ms-2"
                >
                  Logout
                </button>
              </>
            ) : (
              // Show when user is not logged in
              <>
                <Nav.Link 
                  as={NavLink} 
                  to="/login" 
                  className={({ isActive }) => 
                    `fw-semibold px-3 nav-link-custom ${isActive ? 'active' : ''}`
                  }
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={NavLink} 
                  to="/register" 
                  className={({ isActive }) => 
                    `fw-semibold px-3 nav-link-custom ${isActive ? 'active' : ''}`
                  }
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation