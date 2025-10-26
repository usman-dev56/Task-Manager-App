import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Home() {
  return (
    <Container>
      <Row className="text-center my-5">
        <Col>
          <h1 className="display-4 mb-4">Welcome to TaskManager</h1>
          <p className="lead mb-4">
            A simple and efficient way to manage your daily tasks and boost your productivity.
          </p>
          <LinkContainer to="/dashboard">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      <Row className="my-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>📝 Easy Task Creation</Card.Title>
              <Card.Text>
                Quickly add tasks with titles, descriptions, and priority levels.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>✅ Progress Tracking</Card.Title>
              <Card.Text>
                Mark tasks as completed and track your progress visually.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>🎯 Priority Management</Card.Title>
              <Card.Text>
                Organize tasks by priority to focus on what matters most.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home