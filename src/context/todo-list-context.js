import { createContext, useState } from "react";
import { saveTodoToStorage, getTodoFromStorage } from "../utils/storage";

const TodoListContext = createContext({
  list: [],
  selectedTodos: [],
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  selectTodo: () => {},
  markTodosDone: () => {},
  removeSelectedTodos: () => {},
});

const TodoListContextProvider = ({ children }) => {
  const [list, setList] = useState(getTodoFromStorage());
  const [selectedTodos, setSelectedTodos] = useState([]);

  const addTodo = (newTodo) => {
    const newList = [...list, newTodo];
    setList(newList);
    saveTodoToStorage(newList);
  };

  const removeTodo = (removedId) => {
    const newList = list.filter((item) => item.id !== removedId);
    setList(newList);
    saveTodoToStorage(newList);
  };

  const updateTodo = (updatedTodo) => {
    const newList = list.map((item) =>
      item.id !== updatedTodo.id ? item : updatedTodo
    );
    setList(newList);
    saveTodoToStorage(newList);
  };

  const selectTodo = (todoId) => {
    if (selectedTodos.includes(todoId)) {
      setSelectedTodos((prevState) =>
        prevState.filter((item) => item !== todoId)
      );
    } else {
      setSelectedTodos((prevState) => [...prevState, todoId]);
    }
  };

  const markTodosDone = () => {
    const newList = list.map((item) =>
      selectedTodos.includes(item.id) ? { ...item, isCompleted: true } : item
    );
    setList(newList);
    saveTodoToStorage(newList);
    setSelectedTodos([]);
  };

  const removeSelectedTodos = () => {
    const newList = list.filter((item) => !selectedTodos.includes(item.id));
    setList(newList);
    saveTodoToStorage(newList);
    setSelectedTodos([]);
  };

  return (
    <TodoListContext.Provider
      value={{
        list,
        addTodo,
        removeTodo,
        updateTodo,
        selectedTodos,
        selectTodo,
        markTodosDone,
        removeSelectedTodos,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext };
export default TodoListContextProvider;
