import { useState } from "react";

function App() {
  const [todo, setTodo] = useState(null);
  const [priority, setPriority] = useState("Low");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    if (editId) {
      setTodos(
        todos.map((item) =>
          item.id === editId ? { ...item, text: todo, priority } : item
        )
      );
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now(), text: todo, priority }
      ]);
    }

    setTodo("");
    setPriority("Low");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setTodo(item.text);
    setPriority(item.priority);
    setEditId(item.id);
  };

  const filteredTodos =
    filter === "All"
      ? todos
      : todos.filter((item) => item.priority === filter);

  const hasPriority = (p) => todos.some((t) => t.priority === p);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card tech-card text-light shadow-lg">
            <div className="card-body p-4">

              <h3 className="text-center mb-4 fw-semibold">
                <i className="ri-todo-line me-2 text-info"></i>
                TODO
              </h3>

              <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group mb-3">
                  <span className="input-group-text icon-box">
                    <i className="ri-input-method-line"></i>
                  </span>
                  <input
                    className="form-control tech-input"
                    placeholder="Create new task..."
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text icon-box">
                    <i className="ri-list-radio"></i>
                  </span>
                  <select
                    className="form-select tech-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <button className="btn btn-info w-100 fw-semibold">
                  <i className="ri-add-line me-1"></i>
                  {editId ? "Update Task" : "Add Task"}
                </button>
              </form>


              <div className="mb-3">
                <select
                  className="form-select tech-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Tasks</option>
                  <option value="Low" disabled={!hasPriority("Low")}>
                    Low Priority
                  </option>
                  <option value="Medium" disabled={!hasPriority("Medium")}>
                    Medium Priority
                  </option>
                  <option value="High" disabled={!hasPriority("High")}>
                    High Priority
                  </option>
                </select>
              </div>


              <div className="table-responsive">
                <table className="table table-dark tech-table">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Task</th>
                      <th className="text-center">Priority</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTodos.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-light text-muted py-4">
                          No Todos Avalaible
                        </td>
                      </tr>
                    ) : (
                      filteredTodos.map((item, index) => (
                        <tr key={item.id}>
                          <td className="fw-semibold text-info">
                            {index + 1}
                          </td>

                          <td>{item.text}</td>

                          <td className="text-center">
                            <span
                              className={`badge px-3 py-2 ${item.priority === "High"
                                  ? "bg-danger"
                                  : item.priority === "Medium"
                                    ? "bg-warning text-dark"
                                    : "bg-success"
                                }`}
                            >
                              {item.priority}
                            </span>
                          </td>


                          <td className="text-center">

                            <button
                              className={`btn btn-sm me-2 ${editId === item.id
                                  ? "btn-warning"
                                  : "btn-outline-info"
                                }`}
                              onClick={() => handleEdit(item)}
                            >
                              <i className="ri-edit-2-line"></i>
                            </button>


                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="ri-delete-bin-6-line"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
