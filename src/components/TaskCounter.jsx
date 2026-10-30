import checkIcon from '../assets/check_icon.png'

function TaskCounter({ total, completed }) {
  return (
    <div
      className="task-counter"
      aria-label={`${completed} completed tasks out of ${total}`}
    >
      <img src={checkIcon} alt="" aria-hidden="true" />
      <span>
        {total}/{completed}
      </span>
    </div>
  )
}

export default TaskCounter
