import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      return
    }
    onAddTask(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task-input">
        New task
      </label>
      <input
        id="new-task-input"
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  )
}

export default TaskForm
