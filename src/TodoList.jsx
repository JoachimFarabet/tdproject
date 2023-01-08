import React from "react"

const TodoList = (props) => {
  const handleRename = (id) => {
    const newText = prompt("Enter new text for to-do item")

    if (newText) {
      props.onRename(id, newText)
    }
  }

  return (
    <div>
      <ul>
        {props.items.map((item) => (
          <li
            key={item.id}
            style={{
              display: item.completed && props.hideCompleted ? "none" : "block",
            }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => props.onToggle(item.id)}
            />
            {item.text}
            <button onClick={() => props.onDelete(item.id)}>Delete</button>
            <button onClick={() => handleRename(item.id)}>Rename</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
