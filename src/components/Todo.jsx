import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createTodo, deleteTodo,getTodo,updateTodo,} from "../features/Todo/thunk";
import "./Todo.css";
import { TiTick } from "react-icons/ti";
import { TbRefresh } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiPencil } from "react-icons/hi";

const TodoApp = () => {
  const dispatch = useDispatch();
  const { todo, loading, error } = useSelector((state) => state.todo);

  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    status: "pending",
  });
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleStatusToggle = (item) => {
    const updated = {
      ...item,
      status: item.status === "pending" ? "complete" : "pending",
    };
    dispatch(updateTodo(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (edit) {
      dispatch(updateTodo({ ...edit, ...form }));
      setEdit(null);
    } else {
      dispatch(createTodo({ ...form, status: "pending" }));
    }
    setForm({ title: "", dueDate: "", status: "pending" });
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleDeleteAll = () => {
    todo.forEach((item) => dispatch(deleteTodo(item.id)));
  };
  const handleEdit = (item) => {
    setEdit(item);
    setForm({
      title: item.title,
      dueDate: item.dueDate || "",
      status: item.status || "pending",
    });
  };

  return (
    <div className="todo-container">
      <h2 className="title">Todo List</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Add a todo . . ."
          value={form.title}
          onChange={handleChange}
          className="input"
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="add-btn">
          +
        </button>
      </form>
      <div className="controls">
        <button className="delete-all-btn" onClick={handleDeleteAll}>
          Delete All
        </button>
      </div>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
          ) : todo.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No task found
              </td>
            </tr>
          ) : (
            todo.map((item) => (
              <tr key={item.id}>
                <td
                  className={item.status === "complete" ? "line-through" : ""}
                >
                  {item.title}
                </td>
                <td>{item.dueDate}</td>
                <td>
                  <span className={`status ${item.status}`}>{item.status}</span>
                </td>
                <td>
                  <button onClick={() => handleEdit(item)} className="edit-btn">
                    <HiPencil />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete-btn"
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <button
                    onClick={() => handleStatusToggle(item)}
                    className={`complete-btn ${
                      item.status === "complete" ? "completed" : ""
                    }`}
                    title="Mark as Complete"
                  >
                    {item.status === "complete" ? <TbRefresh /> : <TiTick />}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
