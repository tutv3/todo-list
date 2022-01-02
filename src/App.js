import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TodoListContextProvider from "./context/todo-list-context";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <TodoListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/add-todo" element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
      </TodoListContextProvider>
    </div>
  );
}

export default App;
