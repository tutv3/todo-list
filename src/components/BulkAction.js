import React, { useContext } from "react";
import { TodoListContext } from "../context/todo-list-context";
import "./index.scss";

const BulkAction = () => {
  const { selectedTodos, markTodosDone, removeSelectedTodos } =
    useContext(TodoListContext);

  return (
    <div className={`bulk-action ${selectedTodos.length > 0 ? "show" : ""}`}>
      <strong>Bulk Action:</strong>
      <div className="actions">
        <button className="btn btn-info" onClick={markTodosDone}>
          Done
        </button>
        <button className="btn btn-danger" onClick={removeSelectedTodos}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default BulkAction;
