import { useState, useEffect } from 'react'
import { Row, Col, Tabs, Tab, Badge } from 'react-bootstrap'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import { localStorageService } from '../services/localStorageService'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorageService.getTasks()
    if (savedTasks.length > 0) {
      setTasks(savedTasks)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorageService.saveTasks(tasks)
  }, [tasks])

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date()
    }
    setTasks([...tasks, newTask])
  }

  const handleEditTask = (taskData) => {
    if (!taskData) {
      setEditingTask(null)
      return
    }

    if (editingTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? { ...task, ...taskData } : task
      )
      setTasks(updatedTasks)
      setEditingTask(null)
    }
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
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
      <div className="dashboard-header">
        <div className="container">
          <Row>
            <Col>
              <h1>Task Dashboard</h1>
              <p>Manage your tasks efficiently and boost your productivity</p>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container" style={{ width: '100%', maxWidth: '100%' }}>
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
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dashboard