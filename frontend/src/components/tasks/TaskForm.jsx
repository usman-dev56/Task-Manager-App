import { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'

function TaskForm({ onSubmit, initialData, buttonText = "Add Task" }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    priority: 'medium'
  })

  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      setShowAlert(true)
      return
    }

    onSubmit(formData)
    // Reset form only if not editing
    if (!initialData) {
      setFormData({ title: '', description: '', priority: 'medium' })
    }
    setShowAlert(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Hide alert when user starts typing
    if (showAlert) setShowAlert(false)
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{buttonText}</Card.Title>
        
        {showAlert && (
          <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
            Please enter a task title!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {buttonText}
            </Button>
            {initialData && (
              <Button 
                variant="outline-secondary" 
                type="button"
                onClick={() => onSubmit(null)} // Cancel edit
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TaskForm