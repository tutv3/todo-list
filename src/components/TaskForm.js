import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./index.scss";
import ClickOusideWrapper from "./ClickOutSide";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoCalendar } from "react-icons/go";
import errorMessages from "../constants/error-message";
import { TodoListContext } from "../context/todo-list-context";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const priorityOptions = [
  {
    id: "normal",
    label: "Normal",
  },
  {
    id: "low",
    label: "Low",
  },
  {
    id: "high",
    label: "High",
  },
];

const TaskForm = ({ taskItem, onUpdate }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [dueDate, onChangeDueDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const { addTodo } = useContext(TodoListContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (taskItem) {
      setValue("title", taskItem.title);
      setValue("description", taskItem.description);
      setValue("priority", taskItem.priority);
      onChangeDueDate(new Date(taskItem.dueDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskItem]);

  const showDatePicker = () => setShowDate(true);

  const hideDatePicker = () => setShowDate(false);

  const onChangeDate = (date) => {
    onChangeDueDate(date);
    setShowDate(false);
  };

  const onValid = (data) => {
    if (!taskItem) {
      addTodo({ id: uuidv4(), ...data, dueDate, isCompleted: false });
      reset();
      navigate("/");
      return;
    }
    onUpdate({ id: taskItem.id, ...data, dueDate });
  };

  return (
    <div className="task-form">
      {taskItem ? null : <h1 className="page-title">New Task</h1>}
      <form onSubmit={handleSubmit(onValid)}>
        <div className="input-container">
          <input
            type="text"
            className="input-item"
            placeholder={taskItem ? taskItem.title : "Add new task"}
            {...register("title", {
              required: { value: true, message: errorMessages.inputRequired },
            })}
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>
        <div className="input-container">
          <label className="input-title">Description</label>
          <textarea
            className="input-item"
            placeholder={taskItem ? taskItem.description : ""}
            {...register("description", {
              required: { value: true, message: errorMessages.inputRequired },
            })}
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>
        <div className="input-row input-container">
          <div className="input-container input-container__date">
            <label className="input-title">Due Date</label>
            <div className="input-flex__container">
              <div className="input-item block">
                {dueDate.toLocaleDateString()}
              </div>
              <button type="button" onClick={showDatePicker} className="btn">
                <GoCalendar size={20} />
              </button>
            </div>
            {showDate && (
              <div className="date-container">
                <ClickOusideWrapper callback={hideDatePicker}>
                  <Calendar
                    onChange={onChangeDate}
                    value={dueDate}
                    minDate={new Date()}
                  />
                </ClickOusideWrapper>
              </div>
            )}
          </div>
          <div className="input-container">
            <label className="input-title">Priority</label>
            <select
              className="input-item"
              {...register("priority", {
                required: { value: true, message: errorMessages.inputRequired },
              })}
            >
              {priorityOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-container">
          <button type="submit" className="input-submit btn btn-success">
            {taskItem ? "Update" : "Add"}
          </button>
        </div>
      </form>
      {!taskItem && (
        <div className="mt-1">
          <Link to="/" className="btn btn-info btn-sm btn-flex">
            <AiOutlineArrowLeft /> Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
