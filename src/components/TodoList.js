import React, { useContext, useState, useEffect } from "react";
import { TodoListContext } from "../context/todo-list-context";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { list, removeTodo, updateTodo, selectedTodos, selectTodo } =
    useContext(TodoListContext);
  const [filteredList, setFilteredList] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  useEffect(() => {
    onFilterByKeywords(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  function onFilterByKeywords(input) {
    setFilteredList(
      list.filter((item) =>
        item.title.toLowerCase().includes(input.trim().toLowerCase())
      )
    );
  }

  return (
    <div className="todo-list">
      <h1 className="page-title">To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-item"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {filteredList
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        )
        .map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            onRemove={removeTodo}
            onUpdate={updateTodo}
            selectedTodos={selectedTodos}
            selectTodo={selectTodo}
          />
        ))}
    </div>
  );
};

export default TodoList;
