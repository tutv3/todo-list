import React from "react";
import { Link } from "react-router-dom";
import BulkAction from "../components/BulkAction";
import TodoList from "../components/TodoList";

const HomePage = () => {
  return (
    <div className="home-page">
      <TodoList />
      <div className="mt-1 mb-1">
        <Link to="/add-todo" className="btn btn-success">
          New Todo
        </Link>
      </div>
      <BulkAction />
    </div>
  );
};

export default HomePage;
