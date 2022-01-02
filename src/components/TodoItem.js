import React, { useState } from "react";
import TaskForm from "./TaskForm";
import "./index.scss";
import { AiOutlineCheck } from "react-icons/ai";

const TodoItem = ({
  todoItem,
  onRemove,
  onUpdate,
  selectedTodos,
  selectTodo,
}) => {
  const [editting, setEditting] = useState(false);

  const toggleEditting = () => setEditting((prevState) => !prevState);

  return (
    <div className="todo-item">
      <div className="summary">
        <div className="title">
          <input
            type="checkbox"
            checked={selectedTodos.includes(todoItem.id)}
            onChange={() => selectTodo(todoItem.id)}
          />
          <span>
            {todoItem.title}{" "}
            {todoItem.isCompleted && (
              <AiOutlineCheck size={16} color="#5cb85c" />
            )}
          </span>
        </div>
        <div className="actions">
          <button className="btn btn-sm btn-info" onClick={toggleEditting}>
            {editting ? "Hide Detail" : "Detail"}
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onRemove(todoItem.id)}
          >
            Remove
          </button>
        </div>
      </div>
      {editting && (
        <div className="todo-detail">
          <TaskForm taskItem={todoItem} onUpdate={onUpdate} />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
