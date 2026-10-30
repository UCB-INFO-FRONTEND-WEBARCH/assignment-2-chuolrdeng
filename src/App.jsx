import { useState } from 'react'
import './App.css'
import TaskCounter from './components/TaskCounter.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'

const INITIAL_TASKS = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')

  const total = tasks.length
  const completedCount = tasks.filter((task) => task.completed).length

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed
    }
    if (filter === 'completed') {
      return task.completed
    }
    return true
  })

  function handleAddTask(text) {
    const trimmed = text.trim()
    if (!trimmed) {
      return
    }

    setTasks((previousTasks) => {
      const nextId =
        previousTasks.length === 0
          ? 1
          : Math.max(...previousTasks.map((task) => task.id)) + 1

      return [...previousTasks, { id: nextId, text: trimmed, completed: false }]
    })
  }

  function handleToggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function handleDeleteTask(id) {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id))
  }

  return (
    <>
      <header className="site-header">
        <button className="menu-button" type="button" aria-label="Open menu">
          <img src={menuIcon} alt="" />
        </button>

        <form
          className="quick-find"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <label className="visually-hidden" htmlFor="quick-find-input">
            Quick find
          </label>
          <img src={searchIcon} alt="" aria-hidden="true" />
          <input id="quick-find-input" type="search" placeholder="Quick find" />
        </form>

        <TaskCounter total={total} completed={completedCount} />
      </header>

      <div className="page-layout">
        <nav className="sidebar" aria-label="Task categories">
          <ul className="navigation-list">
            <li>
              <a className="navigation-link active" href="#inbox">
                <img src={inboxIcon} alt="" aria-hidden="true" />
                <span>Inbox</span>
                <span className="task-count">{total}</span>
              </a>
            </li>
            <li>
              <a className="navigation-link" href="#today">
                <img src={calendarIcon} alt="" aria-hidden="true" />
                <span>Today</span>
                <span className="task-count">{total}</span>
              </a>
            </li>
            <li>
              <a className="navigation-link" href="#upcoming">
                <img src={upcomingIcon} alt="" aria-hidden="true" />
                <span>Upcoming</span>
              </a>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <section id="inbox" aria-labelledby="inbox-heading">
            <h1 id="inbox-heading">Inbox</h1>

            <div className="task-filters" role="group" aria-label="Filter tasks">
              <button
                type="button"
                className={`filter-button${filter === 'all' ? ' active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <span className="filter-separator" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className={`filter-button${filter === 'active' ? ' active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <span className="filter-separator" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className={`filter-button${filter === 'completed' ? ' active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>

            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </section>
        </main>
      </div>
    </>
  )
}

export default App
