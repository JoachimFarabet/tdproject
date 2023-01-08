import React, { useState } from "react"
import TodoList from "../TodoList"
import TodoForm from "../TodoForm"

const App = () => {
  const [lists, setLists] = useState([])
  const [selectedListId, setSelectedListId] = useState(null)
  const [hideCompleted, setHideCompleted] = useState(false)

  const selectedList = selectedListId
    ? lists.find((l) => l.id === selectedListId)
    : { name: "choose a list", todos: [] }
  const selectedTodos = selectedList.todos

  const addTodo = (todo) => {
    setLists(
      lists.map((l) => {
        if (l.id === selectedListId) {
          return { ...l, todos: [...l.todos, todo] }
        }

        return l
      })
    )
  }

  const toggleTodo = (id) => {
    setLists(
      lists.map((l) => {
        if (l.id === selectedListId) {
          return {
            ...l,
            todos: l.todos.map((t) => {
              if (t.id === id) {
                return { ...t, completed: !t.completed }
              }

              return t
            }),
          }
        }

        return l
      })
    )
  }

  const deleteTodo = (id) => {
    setLists(
      lists.map((l) => {
        if (l.id === selectedListId) {
          return { ...l, todos: l.todos.filter((t) => t.id !== id) }
        }

        return l
      })
    )
  }

  const renameTodo = (id, newText) => {
    setLists(
      lists.map((l) => {
        if (l.id === selectedListId) {
          return {
            ...l,
            todos: l.todos.map((t) => {
              if (t.id === id) {
                return { ...t, text: newText }
              }

              return t
            }),
          }
        }

        return l
      })
    )
  }

  const addList = (name) => {
    setLists([...lists, { id: Date.now(), name, todos: [] }])
  }

  const deleteList = (id) => {
    setLists(lists.filter((l) => l.id !== id))
    setSelectedListId(null)
  }

  return (
    <div>
      <div>
        {lists.map((l) => (
          <button key={l.id} onClick={() => setSelectedListId(l.id)}>
            {l.name}
          </button>
        ))}
        <button onClick={() => addList(prompt("Enter list name"))}>
          Add List
        </button>
      </div>
      {selectedList ? (
        <>
          <h1>{selectedList.name || "Default Name"}</h1>
          <TodoForm onSubmit={addTodo} />
          {selectedTodos.length > 0 && (
            <div>
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show" : "Hide"} completed
              </button>
              <span>
                {selectedTodos.filter((t) => !t.completed).length}/
                {selectedTodos.length}
              </span>
            </div>
          )}
          <TodoList
            items={selectedTodos}
            hideCompleted={hideCompleted}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onRename={renameTodo}
          />
          <button onClick={() => deleteList(selectedListId)}>
            Delete List
          </button>
        </>
      ) : (
        <p>Please select a list</p>
      )}
    </div>
  )
}

export default App
