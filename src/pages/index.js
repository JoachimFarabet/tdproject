import React, { useState } from "react"
import TodoList from "../components/TodoList"
import TodoForm from "../components/TodoForm"

const Index = () => {
  const [lists, setLists] = useState([])
  const [selectedListId, setSelectedListId] = useState(null)
  const [hideCompleted, setHideCompleted] = useState(false)

  const selectedList = selectedListId
    ? lists.find((l) => l.id === selectedListId)
    : null

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

  const renameList = (newName) => {
    setLists(
      lists.map((l) => {
        if (l.id === selectedListId) {
          return { ...l, name: newName }
        }

        return l
      })
    )
  }

  const deleteList = (id) => {
    setLists(lists.filter((l) => l.id !== id))
    setSelectedListId(null)
  }

  const tabClassName = "px-3 h-10 border rounded-t-md"

  return (
    <div>
      <div className="sticky top-0 bg-white border-b">
        <div className="py-4 flex items-center text-sm overflow-x-auto border-b">
          {lists.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedListId(l.id)}
              className={`relative font-bold ${tabClassName} ${
                selectedListId === l.id ? "border-gray-400" : "border-gray-200"
              }`}
            >
              {l.name}
              <span className="ml-1 pr-1 py-0.5 rounded-full bg-blue-400 text-xs">
                <span className="mr-0.5 px-1 py-0.5 rounded-full bg-green-400">
                  {l.todos.filter((t) => t.completed).length}
                </span>
                {l.todos.length}
              </span>
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-300">
                <div
                  className="absolute top-0 left-0 bottom-0 h-0.5 bg-green-500 transition-all"
                  style={{
                    width: `${
                      (l.todos.filter((t) => t.completed).length /
                        l.todos.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </button>
          ))}
          <button
            onClick={() => {
              const name = prompt("Enter list name")

              if (!name) {
                return
              }

              addList(name)
            }}
            className={`ml-4 ${tabClassName}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {!!selectedList && (
          <div className="px-2 flex justify-between items-center">
            <div className="flex gap-2">
              <TodoForm onSubmit={addTodo} />
              <button
                onClick={() => {
                  const name = prompt("Enter new list name")

                  if (!name) {
                    return
                  }

                  renameList(name)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </button>
              <button onClick={() => deleteList(selectedListId)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div>
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedList ? (
        <>
          <TodoList
            items={selectedList.todos}
            hideCompleted={hideCompleted}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onRename={renameTodo}
          />
        </>
      ) : (
        <p>Please select a list</p>
      )}
    </div>
  )
}

export default Index
