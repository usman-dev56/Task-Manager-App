import { Card, Button, Badge, Row, Col } from 'react-bootstrap'

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">📝</div>
        <h5>No tasks found</h5>
        <p className="text-muted">Create your first task to get started with your productivity journey!</p>
      </div>
    )
  }

  return (
    <div>
      {tasks.map(task => (
        <Card 
          key={task.id} 
          className={`mb-3 task-card priority-${task.priority} ${task.completed ? 'task-completed' : ''}`}
        >
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <div className="d-flex align-items-start mb-2">
                  <h5 className={`mb-0 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                    {task.title}
                  </h5>
                  <Badge 
                    bg={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'secondary'}
                    className="ms-2"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <p className="mb-2 text-muted">{task.description}</p>
                <small className="text-muted">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </Col>
              <Col md={4}>
                <div className="d-flex justify-content-end gap-2 flex-wrap">
                  <Button
                    variant={task.completed ? "warning" : "success"}
                    size="sm"
                    onClick={() => onToggle(task.id)}
                  >
                    {task.completed ? '↶ Undo' : '✓ Complete'}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit && onEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default TaskList