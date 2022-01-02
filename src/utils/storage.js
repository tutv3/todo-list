const saveTodoToStorage = (todoList) =>
  localStorage.setItem("todoList", JSON.stringify(todoList));

const getTodoFromStorage = () =>
  JSON.parse(localStorage.getItem("todoList") || "") || [];

export { saveTodoToStorage, getTodoFromStorage };
