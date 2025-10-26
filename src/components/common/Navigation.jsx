// import { Navbar, Nav, Container } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'

// function Navigation() {
//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="sticky-navbar py-1">
//       <Container fluid className="px-4">
//         {/* Logo on the left */}
//         <Navbar.Brand className="fw-bold fs-3">TaskManager</Navbar.Brand>
        
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
//         <Navbar.Collapse id="basic-navbar-nav">
//           {/* Navigation items pushed to the right */}
//           <Nav className="ms-auto d-flex align-items-center">

//             <LinkContainer to="/">
//               <Nav.Link className="fw-semibold px-3">Home</Nav.Link>
//             </LinkContainer>

//             <LinkContainer to="/login">
//               <Nav.Link className="fw-semibold px-3">Login</Nav.Link>
//             </LinkContainer>

//             <LinkContainer to="/register">
//               <Nav.Link className="fw-semibold px-3">Register</Nav.Link>
//             </LinkContainer>
            
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   )
// }

// export default Navigation


import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Navigation() {
  // Style function for nav links
  const getNavLinkClass = ({ isActive }) => 
    `fw-semibold px-3 ${isActive ? 'active-nav-link' : ''}`

  // Style function for dashboard button
  const getDashboardClass = ({ isActive }) => 
    `fw-semibold px-3 ms-2 btn ${isActive ? 'btn-primary' : 'btn-outline-light'}`

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-navbar py-1">
      <Container fluid className="px-4">
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-3">
          TaskManager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={NavLink} to="/" className={getNavLinkClass}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className={getNavLinkClass}>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className={getNavLinkClass}>
              Register
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation