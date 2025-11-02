import { useState, useEffect } from 'react'
import { Row, Col, Tabs, Tab, Badge, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import { taskService } from '../services/taskService'
import { authService } from '../services/authService'



function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  // Check if user is logged in and get user info
  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user) {
      navigate('/login')
    } else {
      setCurrentUser(user)
    }
  }, [navigate])

  // Load tasks from backend
  useEffect(() => {
    if (currentUser) {
      loadTasks()
    }
  }, [currentUser])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const tasksData = await taskService.getTasks()
      setTasks(tasksData)
    } catch (error) {
      console.error('Error loading tasks:', error)
      setError('Failed to load tasks. Please try again.')
      if (error.response?.status === 401) {
        authService.logout()
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      setError('')
      const newTask = await taskService.createTask(taskData)
      setTasks([newTask, ...tasks])
    } catch (error) {
      console.error('Error adding task:', error)
      setError('Failed to add task. Please try again.')
    }
  }

  const handleEditTask = async (taskData) => {
    if (!taskData) {
      setEditingTask(null) // Cancel edit
      return
    }

    try {
      setError('')
      const updatedTask = await taskService.updateTask(editingTask._id, taskData)
      setTasks(tasks.map(task => task._id === editingTask._id ? updatedTask : task))
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
      setError('Failed to update task. Please try again.')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setError('')
        await taskService.deleteTask(taskId)
        setTasks(tasks.filter(task => task._id !== taskId))
      } catch (error) {
        console.error('Error deleting task:', error)
        setError('Failed to delete task. Please try again.')
      }
    }
  }

  const handleToggleTask = async (taskId) => {
    try {
      setError('')
      const updatedTask = await taskService.toggleTask(taskId)
      setTasks(tasks.map(task => task._id === taskId ? updatedTask : task))
    } catch (error) {
      console.error('Error toggling task:', error)
      setError('Failed to update task. Please try again.')
    }
  }

  const startEditTask = (task) => {
    setEditingTask(task)
  }

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter(task => {
    switch (activeTab) {
      case 'active':
        return !task.completed
      case 'completed':
        return task.completed
      default:
        return true
    }
  })

  // Count tasks for badges
  const allCount = tasks.length
  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div style={{ width: '100%' }}>
      {/* Enhanced Header - Full Width with User Welcome */}
      <div className="dashboard-header">
        <div className="container">
          <Row className="align-items-center">
            <Col>
              <h1>Task Dashboard</h1>
              <p>
                Welcome back, <strong>{currentUser?.username}</strong>! Manage your tasks efficiently and boost your productivity.
              </p>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container" style={{ width: '100%', maxWidth: '100%' }}>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Row style={{ marginLeft: 0, marginRight: 0, width: '100%' }}>
          <Col lg={4} className="mb-4" style={{ paddingLeft: 15, paddingRight: 15 }}>
            <div className="sticky-form">
              {editingTask ? (
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">✏️ Edit Task</h5>
                  </div>
                  <div className="card-body">
                    <TaskForm
                      onSubmit={handleEditTask}
                      initialData={editingTask}
                      buttonText="Update Task"
                    />
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">➕ Add New Task</h5>
                  </div>
                  <div className="card-body">
                    <TaskForm onSubmit={handleAddTask} />
                  </div>
                </div>
              )}
            </div>
          </Col>

          <Col lg={8} style={{ paddingLeft: 15, paddingRight: 15 }}>
            <div className="card">
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading tasks...</span>
                    </Spinner>
                    <p className="mt-3">Loading your tasks...</p>
                  </div>
                ) : (
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(tab) => setActiveTab(tab)}
                    className="mb-0"
                  >
                    <Tab 
                      eventKey="all" 
                      title={
                        <span className="d-flex align-items-center">
                          📋 All Tasks 
                          <Badge bg="primary" className="ms-2">{allCount}</Badge>
                        </span>
                      }
                    >
                      <div className="mt-3">
                        <TaskList
                          tasks={filteredTasks}
                          onDelete={handleDeleteTask}
                          onToggle={handleToggleTask}
                          onEdit={startEditTask}
                        />
                      </div>
                    </Tab>
                    <Tab 
                      eventKey="active" 
                      title={
                        <span className="d-flex align-items-center">
                          ⏳ Active 
                          <Badge bg="success" className="ms-2">{activeCount}</Badge>
                        </span>
                      }
                    >
                      <div className="mt-3">
                        <TaskList
                          tasks={filteredTasks}
                          onDelete={handleDeleteTask}
                          onToggle={handleToggleTask}
                          onEdit={startEditTask}
                        />
                      </div>
                    </Tab>
                    <Tab 
                      eventKey="completed" 
                      title={
                        <span className="d-flex align-items-center">
                          ✅ Completed 
                          <Badge bg="secondary" className="ms-2">{completedCount}</Badge>
                        </span>
                      }
                    >
                      <div className="mt-3">
                        <TaskList
                          tasks={filteredTasks}
                          onDelete={handleDeleteTask}
                          onToggle={handleToggleTask}
                          onEdit={startEditTask}
                        />
                      </div>
                    </Tab>
                  </Tabs>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dashboard